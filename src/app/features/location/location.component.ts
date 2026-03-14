import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-location',
  imports: [NavBarComponent, FadeSliderComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);

  isNavBarVisible = this.navBarService.navBarState;

  slider = toSignal(this.galleriesService.getGallery('location-slider'), { initialValue: [] });
}
