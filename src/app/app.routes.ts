import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CasaPepeComponent } from './features/casa-pepe/casa-pepe.component';
import { CasaScuolaComponent } from './features/casa-scuola/casa-scuola.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    children: [],
  },
  {
    path: 'casa-peppe',
    title: 'Casa Peppe',
    component: CasaPepeComponent,
    children: [],
  },
  {
    path: 'casa-scuola',
    title: 'Casa Scuola',
    component: CasaScuolaComponent,
    children: [],
  },
];
