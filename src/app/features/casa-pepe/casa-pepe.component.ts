import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-casa-pepe',
  imports: [
    CommonModule,
    SliderComponent,
    FullScreenSliderComponent,
    NavBarComponent,
  ],
  templateUrl: './casa-pepe.component.html',
  styleUrl: './casa-pepe.component.css',
})
export class CasaPepeComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);
  isNavBarVisible = this.navBarService.navBarState;

  inside = toSignal(this.galleriesService.getGallery('casa-pepe-inside'), { initialValue: [] });
  outside = toSignal(this.galleriesService.getGallery('casa-pepe-outside'), { initialValue: [] });
  map = toSignal(this.galleriesService.getGallery('casa-pepe-map'), { initialValue: [] });

  isAtBottom = false;

  onDescriptionScroll(event: Event) {
    const el = event.target as HTMLElement;
    this.isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
  }

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
