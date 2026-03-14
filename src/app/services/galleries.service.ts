import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  updateDoc,
  docData,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gallery } from '../models/gallery.model';

@Injectable({ providedIn: 'root' })
export class GalleriesService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'galleries');

  getGallery(id: string): Observable<string[]> {
    return (docData(doc(this.firestore, 'galleries', id)) as Observable<Gallery | undefined>).pipe(
      map((g) => g?.images ?? [])
    );
  }

  getGalleryDoc(id: string): Observable<Gallery | undefined> {
    return docData(doc(this.firestore, 'galleries', id)) as Observable<Gallery | undefined>;
  }

  getAllGalleries(): Observable<Gallery[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Gallery[]>;
  }

  updateImages(id: string, images: string[]): Promise<void> {
    return updateDoc(doc(this.firestore, 'galleries', id), {
      images,
      updatedAt: serverTimestamp(),
    } as any);
  }

  updateGalleryDoc(id: string, data: Partial<Gallery>): Promise<void> {
    return updateDoc(doc(this.firestore, 'galleries', id), {
      ...data,
      updatedAt: serverTimestamp(),
    } as any);
  }

  async seed(galleries: Omit<Gallery, 'updatedAt'>[]): Promise<void> {
    for (const g of galleries) {
      const { id, ...data } = g;
      await setDoc(doc(this.firestore, 'galleries', id!), {
        ...data,
        updatedAt: serverTimestamp(),
      });
    }
  }
}
