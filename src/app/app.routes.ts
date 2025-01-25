import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    children: [],
  },
];
