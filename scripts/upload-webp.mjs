/**
 * Upload WebP images from a local folder to Firebase Storage.
 *
 * For each gallery in Firestore that has an `images` array, this script looks
 * for a matching WebP file (same base name, .webp extension) in the source
 * directory and uploads it under  galleries/{galleryId}/webp/{filename}.
 *
 * The original full-size images are left untouched — they stay as the
 * click-through source in the FullScreenSlider.
 *
 * A new field `webpImages` (parallel array to `images`) is written back to
 * the Firestore document so the Angular app can use the lightweight version
 * in sliders while keeping the original URL for lightbox views.
 *
 * Prerequisites:
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *
 * Usage:
 *   node scripts/upload-webp.mjs
 *   node scripts/upload-webp.mjs --src ~/Pictures/webp-exports
 *   node scripts/upload-webp.mjs --src ~/Downloads --gallery home-slider
 *   node scripts/upload-webp.mjs --src ~/Downloads --dry-run
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, basename, extname, join } from 'path';
import { homedir } from 'os';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

function getArg(flag, defaultValue) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : defaultValue;
}

const SRC_DIR = getArg('--src', join(homedir(), 'Downloads')).replace(/^~/, homedir());
const TARGET_GALLERY = getArg('--gallery', null);
const DRY_RUN = args.includes('--dry-run');

// ---------------------------------------------------------------------------
// Firebase setup
// ---------------------------------------------------------------------------

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credPath || !existsSync(credPath)) {
  console.error(
    '❌  GOOGLE_APPLICATION_CREDENTIALS is not set or the file does not exist.\n' +
    '   Generate a service account key in the Firebase console:\n' +
    '   Project settings → Service accounts → Generate new private key\n' +
    '   Then: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json'
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

/** Recursively collect all .webp files under a directory */
function collectWebpFiles(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...collectWebpFiles(fullPath));
    } else if (extname(entry).toLowerCase() === '.webp') {
      results.push(fullPath);
    }
  }
  return results;
}

/** Return the stem (filename without extension) of a URL or path */
function stem(pathOrUrl) {
  const b = basename(decodeURIComponent(pathOrUrl));
  // Remove query string if present
  return b.split('?')[0].replace(/\.[^.]+$/, '');
}

async function uploadFile(localPath, storagePath) {
  const file = bucket.file(storagePath);
  await bucket.upload(localPath, {
    destination: storagePath,
    public: true,
    metadata: { contentType: 'image/webp' },
  });
  return `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\n📁 Source directory : ${SRC_DIR}`);
console.log(`🔥 Storage bucket   : ${bucket.name}`);
if (DRY_RUN) console.log('🧪 DRY RUN — no files will be uploaded or written\n');

const webpFiles = collectWebpFiles(SRC_DIR);
if (webpFiles.length === 0) {
  console.error(`❌  No .webp files found in ${SRC_DIR}`);
  process.exit(1);
}

console.log(`Found ${webpFiles.length} WebP file(s)\n`);

// Build a lookup map: stem → local path
const webpByStem = new Map();
for (const f of webpFiles) {
  webpByStem.set(stem(f), f);
}

// Fetch galleries from Firestore
const snapshot = await db.collection('galleries').get();
const galleries = snapshot.docs
  .filter((d) => !TARGET_GALLERY || d.id === TARGET_GALLERY)
  .map((d) => ({ id: d.id, ...d.data() }));

if (galleries.length === 0) {
  console.error(TARGET_GALLERY
    ? `❌  Gallery "${TARGET_GALLERY}" not found in Firestore.`
    : '❌  No galleries found in Firestore.');
  process.exit(1);
}

let totalUploaded = 0;
let totalSkipped = 0;

for (const gallery of galleries) {
  const images = gallery.images ?? [];
  if (images.length === 0) {
    console.log(`⏭  ${gallery.id}: no images array, skipping`);
    continue;
  }

  console.log(`\n→ Gallery: ${gallery.id} (${gallery.label ?? ''}) — ${images.length} image(s)`);

  const webpUrls = [];
  let changed = false;

  for (let i = 0; i < images.length; i++) {
    const originalUrl = images[i];
    const imageStem = stem(originalUrl);
    const localWebp = webpByStem.get(imageStem);

    if (!localWebp) {
      // No WebP found — keep the original URL as fallback
      webpUrls.push(originalUrl);
      console.log(`  [${i + 1}/${images.length}] ⚠  No WebP for "${imageStem}" — keeping original`);
      totalSkipped++;
      continue;
    }

    const storagePath = `galleries/${gallery.id}/webp/${basename(localWebp)}`;
    console.log(`  [${i + 1}/${images.length}] ✓  ${basename(localWebp)}`);

    if (!DRY_RUN) {
      const url = await uploadFile(localWebp, storagePath);
      webpUrls.push(url);
    } else {
      webpUrls.push(`[DRY-RUN] gs://${bucket.name}/${storagePath}`);
    }

    changed = true;
    totalUploaded++;
  }

  if (changed && !DRY_RUN) {
    await db.collection('galleries').doc(gallery.id).update({
      webpImages: webpUrls,
      updatedAt: Timestamp.now(),
    });
    console.log(`  ✓  Firestore updated: webpImages written (${webpUrls.length} entries)`);
  } else if (changed && DRY_RUN) {
    console.log(`  🧪 Would write webpImages to Firestore for ${gallery.id}`);
  }
}

console.log(`\n✅  Done — ${totalUploaded} uploaded, ${totalSkipped} fell back to original.`);
