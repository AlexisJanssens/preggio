import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-casa-pepe',
  imports: [
    CommonModule,
    SliderComponent,
    FullScreenSliderComponent,
  ],
  templateUrl: './casa-pepe.component.html',
  styleUrl: './casa-pepe.component.css',
})
export class CasaPepeComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private galleriesService = inject(GalleriesService);

  inside = toSignal(this.galleriesService.getGallery('PEPPE_INTERIEUR'), { initialValue: [] });
  insideThumbs = toSignal(this.galleriesService.getGallery('PEPPE_INTERIEUR_MINIATURES'), { initialValue: [] });
  outside = toSignal(this.galleriesService.getGallery('PEPPE_EXTERIEUR'), { initialValue: [] });
  outsideThumbs = toSignal(this.galleriesService.getGallery('PEPPE_EXTERIEUR_MINIATURES'), { initialValue: [] });
  map = toSignal(this.galleriesService.getGallery('PEPPE_PLAN'), { initialValue: [] });
  mapThumbs = toSignal(this.galleriesService.getGallery('PEPPE_PLANS_MINI'), { initialValue: [] });

  isAtBottom = false;

  onDescriptionScroll(event: Event) {
    const el = event.target as HTMLElement;
    this.isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
  }

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
