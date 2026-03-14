/**
 * One-time migration script: uploads local images to Firebase Storage and
 * writes their URLs into Firestore galleries collection.
 *
 * Prerequisites:
 *   npm install --save-dev firebase-admin
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
 *
 * Usage:
 *   node scripts/migrate-galleries.mjs                    # migrate all galleries
 *   node scripts/migrate-galleries.mjs --gallery home-slider  # migrate one gallery
 *
 * The script reads local files from src/assets/img/ and uploads them to:
 *   Storage path: galleries/{galleryId}/{index}_{filename}
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { readFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = resolve(__dirname, '../src/assets/img');

// ---------------------------------------------------------------------------
// Local image paths (copied from the original component TypeScript files)
// ---------------------------------------------------------------------------

const GALLERIES = {
  'home-slider': {
    label: 'Accueil - Slider',
    images: [
      'ACCUEIL/ACCUEIL_SLIDE/1maisonspiscine_1718360272159R_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/2maisons4465_R_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/3maisons_IMG_7093_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/4JARDIN_IMG_9228_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/5CASASCUOLA_IMG_9111_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/6VUE_IMG_0015_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/7PISCINE_IMG_8209_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/8JARDINS_IMG_4806_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/9CASAPEPPE_IMG_7367_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/10CASAPEPPE_IMG_7103_1200x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/11chemin_IMG_7051_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/12TERRASSE_IMG_9903_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/13JARDIN_IMG_6325_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/14TERRASSE_IMG_5976_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/15TERRASSE_IMG_6053_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/16JARDIN_IMG_6148_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/17PISCINEsoir_IMG_4794_1920x108.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/18hameau_IMG_1030_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/19olives_IMG_8248_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/20JARDIN_Hamac1R_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/21IMG_7460_SCUOLAcad_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/22VUE_IMG_4750_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/23IMG_6993_SCUOLA_1920x1080.jpg',
    ],
  },
  'home-vignettes': {
    label: 'Accueil - Vignettes',
    images: [],
    namedImages: {
      pepe: 'ACCUEIL/VIGNETTESpageaccueil/VIGNETTE1-IMG_6629 2R_PEPPE_400.jpg',
      scuola: 'ACCUEIL/VIGNETTESpageaccueil/VIGNETTE2-IMG_6993_SCUOLA_400.jpg',
      situation: 'ACCUEIL/VIGNETTESpageaccueil/VIGNETTE3-IMG_1030_SITUATION_400.jpg',
    },
  },
  'property-pool': {
    label: 'Propriété - Piscine',
    images: [
      'PROPRIETE/PISCINE/1IMG_7075_1200.jpg',
      'PROPRIETE/PISCINE/2IMG_7071_1200.jpg',
      'PROPRIETE/PISCINE/3IMG_6456_1200.jpg',
      'PROPRIETE/PISCINE/4IMG_6451_1200.jpg',
      'PROPRIETE/PISCINE/5IMG_6001_900.jpg',
      'PROPRIETE/PISCINE/6IMG_8219._1200.jpg',
      'PROPRIETE/PISCINE/7IMG_3392_1200.jpg',
      'PROPRIETE/PISCINE/8IMG_3376_1200.jpg',
      'PROPRIETE/PISCINE/9IMG_8295_1200.jpg',
      'PROPRIETE/PISCINE/10IMG_8222_1200.jpg',
      'PROPRIETE/PISCINE/11IMG_6026_1200.jpg',
      'PROPRIETE/PISCINE/12IMG_7065_1200.jpg',
      'PROPRIETE/PISCINE/13IMG_6017_1200.jpg',
      'PROPRIETE/PISCINE/14IMG_7068_1200.jpg',
      'PROPRIETE/PISCINE/15IMG_4801_1200.jpg',
      'PROPRIETE/PISCINE/16OB5584_1200.jpg',
      'PROPRIETE/PISCINE/17IMG_4795_1200.jpg',
    ],
  },
  'property-gardens': {
    label: 'Propriété - Jardins',
    images: [
      'PROPRIETE/JARDINS/1HAMAC_1200.jpg',
      'PROPRIETE/JARDINS/2IMG_4806_1200.jpg',
      'PROPRIETE/JARDINS/3IMG_1629_1200.jpg',
      'PROPRIETE/JARDINS/4IMG_3544_1200.jpg',
      'PROPRIETE/JARDINS/5IMG_3547_900.jpg',
      'PROPRIETE/JARDINS/6IMG_3540_1200.jpg',
      'PROPRIETE/JARDINS/7IMG_3631_1200.jpg',
      'PROPRIETE/JARDINS/8IMG_3633R_1200.jpg',
      'PROPRIETE/JARDINS/9IMG_3626_1200.jpg',
      'PROPRIETE/JARDINS/10IMG_1456_900.jpg',
      'PROPRIETE/JARDINS/11IMG_3690_1200.jpg',
      'PROPRIETE/JARDINS/12IMG_4746_900.jpg',
      'PROPRIETE/JARDINS/13IMG_4128_900.jpg',
      'PROPRIETE/JARDINS/14IMG_7030_1200.jpg',
      'PROPRIETE/JARDINS/15IMG_4125_900.jpg',
      'PROPRIETE/JARDINS/16IMG_1436_900.jpg',
      'PROPRIETE/JARDINS/17IMG_1444_900.jpg',
      'PROPRIETE/JARDINS/18IMG_4632_900.jpg',
      'PROPRIETE/JARDINS/19IMG_9096_900.jpg',
      'PROPRIETE/JARDINS/20IMG_4835_1200.jpg',
      'PROPRIETE/JARDINS/21IMG_6005_1200.jpg',
      'PROPRIETE/JARDINS/22IMG_4733_1200.jpg',
      'PROPRIETE/JARDINS/23IMG_6315_1200.jpg',
      'PROPRIETE/JARDINS/24IMG_6328_900.jpg',
      'PROPRIETE/JARDINS/25IMG_6300_900.jpg',
      'PROPRIETE/JARDINS/26IMG_7403_900.jpg',
      'PROPRIETE/JARDINS/27IMG_9246_1200.jpg',
      'PROPRIETE/JARDINS/28IMG_9247_1200.jpg',
      'PROPRIETE/JARDINS/29IMG_9904_900.jpg',
      'PROPRIETE/JARDINS/30IMG_1460_900.jpg',
      'PROPRIETE/JARDINS/31IMG_1463_900.jpg',
      'PROPRIETE/JARDINS/32IMG_9077_1200.jpg',
      'PROPRIETE/JARDINS/33IMG_8248_1200.jpg',
      'PROPRIETE/JARDINS/33IMG_9054_900.jpg',
      'PROPRIETE/JARDINS/34IMG_1627_900.jpg',
      'PROPRIETE/JARDINS/35IMG_2184_900.jpg',
      'PROPRIETE/JARDINS/36IMG_2239_900.jpg',
      'PROPRIETE/JARDINS/37IMG_3825_1200.jpg',
      'PROPRIETE/JARDINS/38IMG_6154_1200.jpg',
      'PROPRIETE/JARDINS/39IMG_4748_900.jpg',
      'PROPRIETE/JARDINS/40IMG_4799_1200.jpg',
      'PROPRIETE/JARDINS/41IMG_3864_1200.jpg',
      'PROPRIETE/JARDINS/42IMG_9283_1200.jpg',
    ],
  },
  'casa-pepe-inside': {
    label: 'Casa Peppe - Intérieur',
    images: [
      'CASAPEPPE/PEPPE_INTERIEUR/1PEPPE_salon-20220624_144449_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/2PEPPE_salleamanger-IMG_4874_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/3PEPPE_cuisine_canap-cad_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/4PEPPE_cuisine_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/5PEPPE_cuisine-IMG_4872_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/6PEPPE_Salleamanger-R_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/7PEPPE_chambre1_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/8PEPPE_chambre1-IMG_4870_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/9PEPPE_chambre2-IMG_4868_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/10PEPPE_chambre3_1200.jpg',
      'CASAPEPPE/PEPPE_INTERIEUR/11PEPPE_chambre4-IMG_4867_1200.jpg',
    ],
  },
  'casa-pepe-outside': {
    label: 'Casa Peppe - Extérieur',
    images: [
      'CASAPEPPE/PEPPE_EXTERIEUR/1-IMG_6629_2R_PEPPE_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/2PEPPE_IMG_1449_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/3IMG_7366_PEPPEcad_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/4PEPPE_Pergola_IMG_7124_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/5PEPPE_terrasse_IMG_1445_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/6PEPPE_terrasse_IMG_3851_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/7PEPPE_terrasse_IMG_4561_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/8PEPPE_terrasse_IMG_4877_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/9PEPPE_terrasse_IMG_7098_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/10PEPPE_terrasse_IMG_7103_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/11PEPPE_terrasse_IMG_7110_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/12PEPPE_terrasse_IMG_7123_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/13PEPPE_pergola_IMG_2323R_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/14PEPPE_TERRASSE_IMG_9902_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/15PEPPE_terrasse_IMG_4876_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/16terrasse_IMG_4741_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/17PEPPE_IMG_7114_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/18terrasse_IMG_4725_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/19Terrasse_IMG_7372_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/20PEPPE_terrasse_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/21PEPPE_IMG_6631_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/22PEPPE_IMG_7095_1200.jpg',
      'CASAPEPPE/PEPPE_EXTERIEUR/23PEPPE_IMG_1461_1200.jpg',
    ],
  },
  'casa-pepe-map': {
    label: 'Casa Peppe - Plans',
    images: [
      'CASAPEPPE/PEPPE_PLAN/1PEPPE_PLAN_REZ_1200.jpg',
      'CASAPEPPE/PEPPE_PLAN/2PEPPE_PLAN_ETAGE1_1200.jpg',
      'CASAPEPPE/PEPPE_PLAN/3PEPPE_PLAN_ETAGE2_1200.jpg',
    ],
  },
  'casa-scuola-inside': {
    label: 'Casa Scuola - Intérieur',
    images: [
      'SCUOLA/SCUOLA_INTERIEUR/1SALON_IMG_3656_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/2SALON_IMG_3659_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/3SALON_IMG_3655_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/4SAM_IMG_2312-1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/5SAM-IMG_2310-1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/6CUISINE-IMG_2313h-1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/7CUISINE_MG_0166_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/8CUISINE_IMG_2299-1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/9CHAMBRE1_IMG_3747_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/10CHAMBRE1_IMG_3733_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/11CHAMBRE1_IMG_3740_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/12CHAMBRE2_IMG_4751_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/13CHAMBRE2_IMG_4663_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/14CHAMBRE2_IMG_4664_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/15CHAMBRE2_IMG_4672_900.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/16CHAMBRE2_IMG_4680_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/17CHAMBRE3_IMG_5042_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/18CHAMBRE3_IMG_5040_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/19CHAMBRE5_IMG_5040_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/20CHAMBRE5_IMG_5053_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/21CHAMBRE5_IMG_5043_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/22CHAMBRE5_IMG_5057_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/23CHAMBRE4h_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/24CHAMBRE2_IMG_4660_900.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/25SAM-IMG_2308-1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/26SAM_IMG_6347_1200.jpg',
      'SCUOLA/SCUOLA_INTERIEUR/27SALON_IMG_4994v_900.jpg',
    ],
  },
  'casa-scuola-outside': {
    label: 'Casa Scuola - Extérieur',
    images: [
      'SCUOLA/SCUOLA_EXTERIEUR/1EXT_IMG_8521_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/2EXT_IMG_6056_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/3EXT_IMG_6054_900.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/4TERRASSE_IMG_4137_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/5TERRASSE_IMG_5972_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/6TERRASSE_IMG_2307_900.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/7TERRASSE_IMG_9274_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/8TERRASSE_IMG_5971_2_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/9TERRASSE_IMG_9276_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/10TERRASSE_IMG_5974_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/11TERRASSE_IMG_3780_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/12TERRASSE_IMG_3782_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/13JARDIN_IMG_9286_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/14JARDIN_IMG_9289_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/15EXT_IMG_9305_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/16EXT_IMG_9306_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/17TERRASSE_IMG_9307_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/18EXT_IMG_4716_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/19EXT_IMG_5952R_900.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/20EXT_IMG_4671_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/21EXT_IMG_4135_1200.jpg',
      'SCUOLA/SCUOLA_EXTERIEUR/22EXT_IMG_4833_1200.jpg',
    ],
  },
  'casa-scuola-map': {
    label: 'Casa Scuola - Plans',
    images: [
      'SCUOLA/SCUOLA_PLAN/1SCUOLA_PLAN_REZ_1200.jpg',
      'SCUOLA/SCUOLA_PLAN/2SCUOLA_PLAN_ETAGE1_1200.jpg',
      'SCUOLA/SCUOLA_PLAN/3SCUOLA_PLAN_ETAGE2_1200.jpg',
    ],
  },
  'location-slider': {
    label: 'Situation - Slider',
    images: [
      'ACCUEIL/ACCUEIL_SLIDE/1maisonspiscine_1718360272159R_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/2maisons4465_R_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/3maisons_IMG_7093_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/4JARDIN_IMG_9228_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/5CASASCUOLA_IMG_9111_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/6VUE_IMG_0015_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/7PISCINE_IMG_8209_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/8JARDINS_IMG_4806_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/9CASAPEPPE_IMG_7367_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/10CASAPEPPE_IMG_7103_1200x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/11chemin_IMG_7051_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/12TERRASSE_IMG_9903_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/13JARDIN_IMG_6325_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/14TERRASSE_IMG_5976_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/15TERRASSE_IMG_6053_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/16JARDIN_IMG_6148_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/17PISCINEsoir_IMG_4794_1920x108.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/18hameau_IMG_1030_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/19olives_IMG_8248_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/20JARDIN_Hamac1R_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/21IMG_7460_SCUOLAcad_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/22VUE_IMG_4750_1920x1080.jpg',
      'ACCUEIL/ACCUEIL_SLIDE/23IMG_6993_SCUOLA_1920x1080.jpg',
    ],
  },
};

// ---------------------------------------------------------------------------
// Firebase setup — reads FIREBASE_STORAGE_BUCKET from env or uses project default
// ---------------------------------------------------------------------------

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8'))
  : undefined;

const app = initializeApp(
  serviceAccount
    ? { credential: cert(serviceAccount), storageBucket: process.env.FIREBASE_STORAGE_BUCKET }
    : undefined
);

const db = getFirestore(app);
const bucket = getStorage(app).bucket();

// ---------------------------------------------------------------------------
// Upload helpers
// ---------------------------------------------------------------------------

async function uploadLocalFile(localRelPath, storagePath) {
  const localAbsPath = resolve(ASSETS_DIR, localRelPath);
  if (!existsSync(localAbsPath)) {
    console.warn(`  ⚠  File not found, skipping: ${localAbsPath}`);
    return null;
  }
  const file = bucket.file(storagePath);
  await bucket.upload(localAbsPath, { destination: storagePath, public: true });
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
  return publicUrl;
}

async function migrateGallery(galleryId, galleryDef) {
  console.log(`\n→ Migrating gallery: ${galleryId} (${galleryDef.label})`);
  const docData = { label: galleryDef.label, images: [], updatedAt: Timestamp.now() };

  if (galleryDef.namedImages) {
    // Special case: named images (home-vignettes)
    const namedImages = {};
    for (const [key, relPath] of Object.entries(galleryDef.namedImages)) {
      const storagePath = `galleries/${galleryId}/${key}_${basename(relPath)}`;
      console.log(`  Uploading named[${key}]: ${relPath}`);
      const url = await uploadLocalFile(relPath, storagePath);
      namedImages[key] = url ?? '';
    }
    docData.namedImages = namedImages;
  } else {
    // Ordered image array
    const urls = [];
    for (let i = 0; i < galleryDef.images.length; i++) {
      const relPath = galleryDef.images[i];
      const storagePath = `galleries/${galleryId}/${i}_${basename(relPath)}`;
      console.log(`  [${i + 1}/${galleryDef.images.length}] ${basename(relPath)}`);
      const url = await uploadLocalFile(relPath, storagePath);
      if (url) urls.push(url);
    }
    docData.images = urls;
  }

  await db.collection('galleries').doc(galleryId).set(docData);
  console.log(`  ✓ Firestore document written for ${galleryId}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const galleryFlag = args.indexOf('--gallery');
const targetGallery = galleryFlag !== -1 ? args[galleryFlag + 1] : null;

if (targetGallery) {
  if (!GALLERIES[targetGallery]) {
    console.error(`Unknown gallery: ${targetGallery}`);
    process.exit(1);
  }
  await migrateGallery(targetGallery, GALLERIES[targetGallery]);
} else {
  for (const [id, def] of Object.entries(GALLERIES)) {
    await migrateGallery(id, def);
  }
}

console.log('\n✅ Migration complete.');
