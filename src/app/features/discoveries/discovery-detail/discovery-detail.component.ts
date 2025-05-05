import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoveriesComponent } from '../discoveries.component';
import { DiscoveriesService } from '../../../services/discoveries.service';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../../shared/nav-bar.service';

@Component({
  selector: 'app-discovery-detail',
  imports: [NavBarComponent],
  templateUrl: './discovery-detail.component.html',
  styleUrl: './discovery-detail.component.css',
})
export class DiscoveryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private discoveries = inject(DiscoveriesService);
  private navBarService = inject(NavBarService);

  isNavBarVisible = this.navBarService.navBarState;

  discovery: any;

  ngOnInit(): void {
    const discoveryLink = this.route.snapshot.paramMap.get('link');
    this.discovery = this.discoveries.getDiscoveryByLink(discoveryLink ?? '');
  }
}
