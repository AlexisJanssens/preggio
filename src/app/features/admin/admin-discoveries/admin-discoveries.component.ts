import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DiscoveriesService } from '../../../services/discoveries.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-discoveries',
  imports: [RouterLink],
  templateUrl: './admin-discoveries.component.html',
  styleUrl: './admin-discoveries.component.css',
})
export class AdminDiscoveriesComponent {
  private discoveriesService = inject(DiscoveriesService);
  private authService = inject(AuthService);

  discoveries = toSignal(this.discoveriesService.getDiscoveries(), { initialValue: [] });
  seeding = signal(false);

  async seed(): Promise<void> {
    if (!confirm('Importer les données initiales dans Firestore ?')) return;
    this.seeding.set(true);
    await this.discoveriesService.seed();
    this.seeding.set(false);
  }

  async delete(id: string, title: string): Promise<void> {
    if (!confirm(`Supprimer "${title}" ?`)) return;
    await this.discoveriesService.delete(id);
  }

  logout(): void {
    this.authService.logout();
  }
}
