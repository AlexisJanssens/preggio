import { Timestamp } from '@angular/fire/firestore';

export interface Gallery {
  id?: string;
  label: string;
  images: string[];
  namedImages?: { [key: string]: string };
  updatedAt?: Timestamp;
}
