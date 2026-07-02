import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GALLERIES_DATA } from '../data/galleries.data';

@Injectable({ providedIn: 'root' })
export class GalleriesService {
  getGallery(id: string): Observable<string[]> {
    return of(GALLERIES_DATA[id] ?? []);
  }
}
