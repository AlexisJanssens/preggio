import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { DotsLoaderComponent } from '../../shared/dots-loader/dots-loader.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-location',
  imports: [FadeSliderComponent, DotsLoaderComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  private galleriesService = inject(GalleriesService);

  slider = toSignal(this.galleriesService.getGallery('MONTE_TEZIO'), { initialValue: [] });
}
