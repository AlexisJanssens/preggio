import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GalleriesService } from '../../../services/galleries.service';
import { AuthService } from '../../../services/auth.service';
import { Gallery } from '../../../models/gallery.model';

const SEED_GALLERIES: Omit<Gallery, 'updatedAt'>[] = [
  { id: 'ACCUEIL_SLIDE', label: 'Accueil - Slider', images: [] },
  { id: 'VIGNETTESpageaccueil', label: 'Accueil - Vignettes', images: [], namedImages: { pepe: '', scuola: '', situation: '' } },
  { id: 'PISCINE', label: 'Propriété - Piscine', images: [] },
  { id: 'JARDINS', label: 'Propriété - Jardins', images: [] },
  { id: 'PEPPE_INTERIEUR', label: 'Casa Peppe - Intérieur', images: [] },
  { id: 'PEPPE_EXTERIEUR', label: 'Casa Peppe - Extérieur', images: [] },
  { id: 'PEPPE_PLAN', label: 'Casa Peppe - Plans', images: [] },
  { id: 'SCUOLA_INTERIEUR', label: 'Casa Scuola - Intérieur', images: [] },
  { id: 'SCUOLA_EXTERIEUR', label: 'Casa Scuola - Extérieur', images: [] },
  { id: 'casa-scuola-map', label: 'Casa Scuola - Plans', images: [] },
  { id: 'MONTE_TEZIO', label: 'Situation - Slider', images: [] },
];

@Component({
  selector: 'app-admin-galleries',
  imports: [RouterLink],
  templateUrl: './admin-galleries.component.html',
  styleUrl: './admin-galleries.component.css',
})
export class AdminGalleriesComponent {
  private galleriesService = inject(GalleriesService);
  private authService = inject(AuthService);

  galleries = toSignal(this.galleriesService.getAllGalleries(), { initialValue: [] });
  seeding = signal(false);

  async seed(): Promise<void> {
    if (!confirm('Créer les documents galleries vides dans Firestore ?')) return;
    this.seeding.set(true);
    await this.galleriesService.seed(SEED_GALLERIES);
    this.seeding.set(false);
  }

  logout(): void {
    this.authService.logout();
  }
}
