import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { DotsLoaderComponent } from '../../shared/dots-loader/dots-loader.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-location',
  imports: [NavBarComponent, FadeSliderComponent, DotsLoaderComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);

  isNavBarVisible = this.navBarService.navBarState;

  slider = toSignal(this.galleriesService.getGallery('MONTE_TEZIO'), { initialValue: [] });
}
