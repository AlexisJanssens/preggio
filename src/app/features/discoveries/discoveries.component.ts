import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../shared/card/card.component';
import { DiscoveriesService } from '../../services/discoveries.service';

@Component({
  selector: 'app-discoveries',
  imports: [CardComponent],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css',
})
export class DiscoveriesComponent {
  private discoveriesService = inject(DiscoveriesService);

  discoveriesList = toSignal(this.discoveriesService.getDiscoveries(), { initialValue: [] });
}
