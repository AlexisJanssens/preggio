/**
 * Upload all images from public/assets/imgs/ to Firebase Storage.
 *
 * Structure handled:
 *   imgs/{GALLERY webp}/           → storage: galleries/{GALLERY}/
 *   imgs/{GALLERY webp}/{SUB}/     → storage: galleries/{SUB}/   (e.g. PISCINE_MINI)
 *
 * Prerequisites:
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *
 * Usage:
 *   node scripts/upload-imgs-to-firebase.mjs
 *   node scripts/upload-imgs-to-firebase.mjs --src ./public/assets/imgs
 *   node scripts/upload-imgs-to-firebase.mjs --dry-run
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { resolve, basename, extname, join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

function getArg(flag, defaultValue) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : defaultValue;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_SRC = resolve(__dirname, '../public/assets/imgs');
const SRC_DIR = resolve(getArg('--src', DEFAULT_SRC).replace(/^~/, homedir()));
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

const bucket = getStorage().bucket();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a top-level folder name to a gallery name.
 *  - Strips trailing " webp" (case-insensitive)
 *  - Replaces spaces with underscores
 */
function toGalleryName(folderName) {
  return folderName
    .replace(/\s+webp$/i, '')
    .replace(/\s+/g, '_');
}

/**
 * Derive a sub-gallery name from a subfolder, always anchored to the parent
 * gallery name so conflicts are impossible.
 *
 * Strategy: extract the generic suffix (_MINI / _MINIATURES / MINIATURES) from
 * the subfolder name and append it to the parent gallery name.
 *
 *   PEPPE_EXTERIEUR  +  PEPPE_INTERIEUR_MINIATURES  →  PEPPE_EXTERIEUR_MINIATURES
 *   PEPPE_INTERIEUR  +  PEPPE_INTERIEUR_MINIATURES  →  PEPPE_INTERIEUR_MINIATURES
 *   PISCINE          +  PISCINE_MINI                →  PISCINE_MINI
 *
 * Falls back to the normalised subfolder name if no known suffix is found.
 */
function toSubGalleryName(parentGalleryName, subFolderName) {
  const normalized = subFolderName.replace(/\s+/g, '_');
  const match = normalized.match(/(_MINIATURES|_MINI|MINIATURES|MINI)$/i);
  if (match) {
    return `${parentGalleryName}${match[0].startsWith('_') ? '' : '_'}${match[0].replace(/^_/, '_').toUpperCase()}`;
  }
  return normalized;
}

/** Return immediate file children of a directory (non-recursive). */
function listFiles(dir) {
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isFile());
}

/** Return immediate directory children of a directory. */
function listDirs(dir) {
  return readdirSync(dir)
    .map((name) => ({ name, path: join(dir, name) }))
    .filter(({ path }) => statSync(path).isDirectory());
}

function mimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const map = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
  };
  return map[ext] ?? 'application/octet-stream';
}

async function uploadFile(localPath, storagePath) {
  await bucket.upload(localPath, {
    destination: storagePath,
    public: true,
    metadata: { contentType: mimeType(localPath) },
  });
  return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(storagePath)}`;
}

async function uploadGallery(galleryName, files) {
  if (files.length === 0) {
    console.log(`  (no files)`);
    return 0;
  }
  let uploaded = 0;
  for (const filePath of files) {
    const filename = basename(filePath);
    const storagePath = `galleries/${galleryName}/${filename}`;
    if (DRY_RUN) {
      console.log(`  🧪 [DRY-RUN] would upload → ${storagePath}`);
    } else {
      const url = await uploadFile(filePath, storagePath);
      console.log(`  ✓  ${filename}`);
    }
    uploaded++;
  }
  return uploaded;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\n📁 Source : ${SRC_DIR}`);
console.log(`🔥 Bucket : ${bucket.name}`);
if (DRY_RUN) console.log('🧪 DRY RUN — nothing will actually be uploaded\n');
else console.log('');

if (!existsSync(SRC_DIR)) {
  console.error(`❌  Source directory not found: ${SRC_DIR}`);
  process.exit(1);
}

const topLevelDirs = listDirs(SRC_DIR);
if (topLevelDirs.length === 0) {
  console.error(`❌  No subdirectories found in ${SRC_DIR}`);
  process.exit(1);
}

let totalUploaded = 0;

for (const { name: galleryFolder, path: galleryPath } of topLevelDirs) {
  const galleryName = toGalleryName(galleryFolder);

  // Direct files in this gallery folder
  const directFiles = listFiles(galleryPath);
  console.log(`\n→ Gallery: ${galleryName}  (${directFiles.length} file(s))`);
  totalUploaded += await uploadGallery(galleryName, directFiles);

  // Subfolders → separate galleries (name anchored to parent to avoid conflicts)
  const subDirs = listDirs(galleryPath);
  for (const { name: subName, path: subPath } of subDirs) {
    const subGalleryName = toSubGalleryName(galleryName, subName);
    const subFiles = listFiles(subPath);
    console.log(`\n  → Sub-gallery: ${subGalleryName}  (${subFiles.length} file(s))`);
    totalUploaded += await uploadGallery(subGalleryName, subFiles);
  }
}

console.log(`\n✅  Done — ${totalUploaded} file(s) ${DRY_RUN ? 'would be' : ''} uploaded.`);
