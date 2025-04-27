import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { DiscoveriesService } from '../../services/discoveries.service';
import { NavBarService } from '../../shared/nav-bar.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-discoveries',
  imports: [CardComponent, NavBarComponent],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css',
})
export class DiscoveriesComponent {
  discoveries = inject(DiscoveriesService);
  discoveriesList = this.discoveries.getDiscoveries();

  private navBarService = inject(NavBarService);
  isNavBarVisible = this.navBarService.navBarState;
}
