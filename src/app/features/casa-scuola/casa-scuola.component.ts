import { Component, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-casa-scuola',
  standalone: true,
  imports: [
    SliderComponent,
    FullScreenSliderComponent,
  ],
  templateUrl: './casa-scuola.component.html',
  styleUrl: './casa-scuola.component.css',
})
export class CasaScuolaComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;
  private galleriesService = inject(GalleriesService);

  inside = toSignal(this.galleriesService.getGallery('SCUOLA_INTERIEUR'), { initialValue: [] });
  insideThumbs = toSignal(this.galleriesService.getGallery('SCUOLA_INTERIEUR_MINIATURES'), { initialValue: [] });
  outside = toSignal(this.galleriesService.getGallery('SCUOLA_EXTERIEUR'), { initialValue: [] });
  outsideThumbs = toSignal(this.galleriesService.getGallery('SCUOLA_EXTERIEUR_MINIATURES'), { initialValue: [] });
  plan = toSignal(this.galleriesService.getGallery('SCUOLA_PLAN'), { initialValue: [] });
  planThumbs = toSignal(this.galleriesService.getGallery('SCUOLA_PLAN_MINI'), { initialValue: [] });

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
