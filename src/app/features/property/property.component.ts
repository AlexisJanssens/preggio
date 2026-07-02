import { Component, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-property',
  imports: [SliderComponent, FullScreenSliderComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private galleriesService = inject(GalleriesService);

  swimmingPool = toSignal(this.galleriesService.getGallery('PISCINE'), { initialValue: [] });
  swimmingPoolThumbs = toSignal(this.galleriesService.getGallery('PISCINE_MINI'), { initialValue: [] });
  gardens = toSignal(this.galleriesService.getGallery('JARDINS'), { initialValue: [] });
  gardensThumbs = toSignal(this.galleriesService.getGallery('JARDINS_MINI'), { initialValue: [] });

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
