import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DiscoveriesService } from '../../../services/discoveries.service';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../../shared/nav-bar.service';
import { Discovery } from '../../../models/discovery.model';

@Component({
  selector: 'app-discovery-detail',
  imports: [NavBarComponent],
  templateUrl: './discovery-detail.component.html',
  styleUrl: './discovery-detail.component.css',
})
export class DiscoveryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private discoveriesService = inject(DiscoveriesService);
  private navBarService = inject(NavBarService);

  isNavBarVisible = this.navBarService.navBarState;
  discovery = signal<Discovery | undefined>(undefined);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.discoveriesService.getDiscoveryByLink(params.get('link') ?? '')
        )
      )
      .subscribe((d) => this.discovery.set(d));
  }
}
