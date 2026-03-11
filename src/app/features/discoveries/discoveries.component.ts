import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  private discoveriesService = inject(DiscoveriesService);
  private navBarService = inject(NavBarService);

  discoveriesList = toSignal(this.discoveriesService.getDiscoveries(), { initialValue: [] });
  isNavBarVisible = this.navBarService.navBarState;
}
