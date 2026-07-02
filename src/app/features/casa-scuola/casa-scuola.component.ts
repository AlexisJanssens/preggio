import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-casa-scuola',
  standalone: true,
  imports: [
    CommonModule,
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
  map = toSignal(this.galleriesService.getGallery('casa-scuola-map'), { initialValue: [] });
  mapThumbs = toSignal(this.galleriesService.getGallery('casa-scuola-map-thumbs'), { initialValue: [] });

  isAtBottom = false;

  onDescriptionScroll(event: Event) {
    const el = event.target as HTMLElement;
    this.isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
  }

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
