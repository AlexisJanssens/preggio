/**
 * Seed Firestore galleries collection from existing Firebase Storage files.
 *
 * Reads all files under  galleries/  in Storage, groups them by gallery name,
 * and creates/overwrites Firestore documents in the  galleries  collection.
 *
 * Each document gets:
 *   label   : human-readable name (underscores → spaces)
 *   images  : sorted array of public Storage URLs
 *   updatedAt
 *
 * Prerequisites:
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *
 * Usage:
 *   node scripts/seed-firestore-from-storage.mjs
 *   node scripts/seed-firestore-from-storage.mjs --dry-run
 *   node scripts/seed-firestore-from-storage.mjs --prefix galleries/   # default
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

function getArg(flag, defaultValue) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : defaultValue;
}

const PREFIX = getArg('--prefix', 'galleries/');
const DRY_RUN = args.includes('--dry-run');

// ---------------------------------------------------------------------------
// Firebase setup
// ---------------------------------------------------------------------------

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credPath || !existsSync(credPath)) {
  console.error(
    '❌  GOOGLE_APPLICATION_CREDENTIALS is not set or the file does not exist.\n' +
    '   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json'
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(credPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? 'preggio.firebasestorage.app',
});

const db = getFirestore();
const bucket = getStorage().bucket();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Public URL for a storage file (uploaded with public: true) */
function publicUrl(bucketName, filePath) {
  // Encode each path segment individually to preserve slashes
  const encoded = filePath.split('/').map(encodeURIComponent).join('/');
  return `https://storage.googleapis.com/${bucketName}/${encoded}`;
}

/** Human-readable label from gallery ID */
function toLabel(galleryId) {
  return galleryId.replace(/_/g, ' ');
}

/** Natural sort for filenames (handles numeric prefixes like 1_, 2_, 10_, ...) */
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\n🔥 Bucket  : ${bucket.name}`);
console.log(`📂 Prefix  : ${PREFIX}`);
if (DRY_RUN) console.log('🧪 DRY RUN — Firestore will NOT be written\n');
else console.log('');

// List all files under the prefix
const [files] = await bucket.getFiles({ prefix: PREFIX });

if (files.length === 0) {
  console.error(`❌  No files found under gs://${bucket.name}/${PREFIX}`);
  process.exit(1);
}

console.log(`Found ${files.length} file(s) in Storage.\n`);

// Group files by gallery name (first path segment after the prefix)
// Path structure: galleries/{galleryName}/{filename}
const galleries = new Map(); // galleryId → string[]

for (const file of files) {
  const path = file.name; // e.g. "galleries/PISCINE/filename.webp"
  const withoutPrefix = path.slice(PREFIX.length); // e.g. "PISCINE/filename.webp"
  const slashIdx = withoutPrefix.indexOf('/');

  if (slashIdx === -1) continue; // skip files directly under the prefix (shouldn't happen)

  const galleryId = withoutPrefix.slice(0, slashIdx);       // e.g. "PISCINE"
  const filename  = withoutPrefix.slice(slashIdx + 1);      // e.g. "filename.webp"

  if (!filename) continue; // skip "folder placeholder" entries with no filename

  if (!galleries.has(galleryId)) galleries.set(galleryId, []);
  galleries.get(galleryId).push(publicUrl(bucket.name, path));
}

if (galleries.size === 0) {
  console.error('❌  Could not extract any galleries from Storage paths.');
  process.exit(1);
}

// Write to Firestore
let created = 0;

for (const [galleryId, imageUrls] of [...galleries.entries()].sort()) {
  imageUrls.sort(naturalSort);

  const docData = {
    label: toLabel(galleryId),
    images: imageUrls,
    updatedAt: Timestamp.now(),
  };

  console.log(`→ ${galleryId}  (${imageUrls.length} image(s))  label: "${docData.label}"`);

  if (DRY_RUN) {
    console.log(`  🧪 Would write galleries/${galleryId}`);
    imageUrls.slice(0, 2).forEach(u => console.log(`     ${u}`));
    if (imageUrls.length > 2) console.log(`     ... +${imageUrls.length - 2} more`);
  } else {
    await db.collection('galleries').doc(galleryId).set(docData);
    console.log(`  ✓  Written to Firestore`);
    created++;
  }
}

console.log(`\n✅  Done — ${DRY_RUN ? '0 written (dry run)' : `${created} gallery document(s) created/updated`}.`);
