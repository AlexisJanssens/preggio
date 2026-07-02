import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DiscoveriesService } from '../../../services/discoveries.service';
import { ImgComponent } from '../../../shared/img/img.component';
import { Discovery } from '../../../models/discovery.model';

@Component({
  selector: 'app-discovery-detail',
  imports: [ImgComponent],
  templateUrl: './discovery-detail.component.html',
  styleUrl: './discovery-detail.component.css',
})
export class DiscoveryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private discoveriesService = inject(DiscoveriesService);

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
