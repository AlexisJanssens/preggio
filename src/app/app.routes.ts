import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CasaPepeComponent } from './features/casa-pepe/casa-pepe.component';
import { CasaScuolaComponent } from './features/casa-scuola/casa-scuola.component';
import { PropertyComponent } from './features/property/property.component';
import { LocationComponent } from './features/location/location.component';
import { DiscoveriesComponent } from './features/discoveries/discoveries.component';
import { AtmosphereComponent } from './features/atmosphere/atmosphere.component';
import { FavouriteComponent } from './features/favourite/favourite.component';
import { ContactComponent } from './features/contact/contact.component';
import { DiscoveryDetailComponent } from './features/discoveries/discovery-detail/discovery-detail.component';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login.component';
import { AdminDiscoveriesComponent } from './features/admin/admin-discoveries/admin-discoveries.component';
import { AdminDiscoveryEditComponent } from './features/admin/admin-discovery-edit/admin-discovery-edit.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'casa-peppe', title: 'Casa Peppe', component: CasaPepeComponent },
  { path: 'casa-scuola', title: 'Casa Scuola', component: CasaScuolaComponent },
  { path: 'property', title: 'Property', component: PropertyComponent },
  { path: 'location', title: 'Location', component: LocationComponent },
  { path: 'discoveries', title: 'Discoveries', component: DiscoveriesComponent },
  { path: 'discoveries/:link', title: 'Discovery Detail', component: DiscoveryDetailComponent },
  { path: 'atmosphere', title: 'Atmosphere', component: AtmosphereComponent },
  { path: 'contact', title: 'Contact', component: ContactComponent },
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin/discoveries',
    component: AdminDiscoveriesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/discoveries/:id',
    component: AdminDiscoveryEditComponent,
    canActivate: [authGuard],
  },
];
