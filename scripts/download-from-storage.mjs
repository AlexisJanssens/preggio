/**
 * Download all images from Firebase Storage (galleries/ prefix) to src/assets/img/galleries/.
 *
 * Prerequisites:
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *
 * Usage:
 *   node scripts/download-from-storage.mjs
 *   node scripts/download-from-storage.mjs --dry-run
 *   node scripts/download-from-storage.mjs --prefix galleries/ACCUEIL_SLIDE/
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { readFileSync, existsSync, mkdirSync, createWriteStream } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const prefixIdx = args.indexOf('--prefix');
const PREFIX = prefixIdx !== -1 ? args[prefixIdx + 1] : 'galleries/';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEST_DIR = resolve(__dirname, '../src/assets/img/galleries');

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

initializeApp({
  credential: cert(JSON.parse(readFileSync(credPath, 'utf8'))),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? 'preggio.firebasestorage.app',
});

const bucket = getStorage().bucket();

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\n🔥 Bucket : ${bucket.name}`);
console.log(`📂 Prefix : ${PREFIX}`);
console.log(`💾 Dest   : ${DEST_DIR}`);
if (DRY_RUN) console.log('🧪 DRY RUN — nothing will be written\n');
else console.log('');

const [files] = await bucket.getFiles({ prefix: PREFIX });

if (files.length === 0) {
  console.error(`❌  No files found under gs://${bucket.name}/${PREFIX}`);
  process.exit(1);
}

console.log(`Found ${files.length} file(s).\n`);

let downloaded = 0;
let skipped = 0;

for (const file of files) {
  // Storage path: galleries/{galleryName}/{filename}
  const withoutPrefix = file.name.slice(PREFIX.length);
  const slashIdx = withoutPrefix.indexOf('/');

  // Skip folder placeholder entries (no filename after the slash)
  if (slashIdx === -1 || !withoutPrefix.slice(slashIdx + 1)) continue;

  const galleryName = withoutPrefix.slice(0, slashIdx);
  const filename = withoutPrefix.slice(slashIdx + 1);
  const destDir = resolve(DEST_DIR, galleryName);
  const destPath = resolve(destDir, filename);

  if (existsSync(destPath)) {
    console.log(`  · exists  : ${galleryName}/${filename}`);
    skipped++;
    continue;
  }

  if (DRY_RUN) {
    console.log(`  🧪 would download : ${file.name} → src/assets/img/galleries/${galleryName}/${filename}`);
    downloaded++;
    continue;
  }

  mkdirSync(destDir, { recursive: true });

  await pipeline(file.createReadStream(), createWriteStream(destPath));

  console.log(`  ✓ ${galleryName}/${filename}`);
  downloaded++;
}

console.log(`\n✅  Done — ${downloaded} file(s) downloaded, ${skipped} already existed.`);
