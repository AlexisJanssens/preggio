import { Component, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-property',
  imports: [SliderComponent, NavBarComponent, FullScreenSliderComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);
  isNavBarVisible = this.navBarService.navBarState;

  swimmingPool = toSignal(this.galleriesService.getGallery('property-pool'), { initialValue: [] });
  gardens = toSignal(this.galleriesService.getGallery('property-gardens'), { initialValue: [] });

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
