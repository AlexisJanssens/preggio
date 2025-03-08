import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { DiscoveriesService } from '../../services/discoveries.service';

@Component({
  selector: 'app-discoveries',
  imports: [CardComponent],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css',
})
export class DiscoveriesComponent {
  discoveries = inject(DiscoveriesService);

  discoveriesList = this.discoveries.getDiscoveries();
}
