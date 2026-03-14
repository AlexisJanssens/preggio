import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-casa-scuola',
  standalone: true,
  imports: [
    CommonModule,
    SliderComponent,
    FullScreenSliderComponent,
    NavBarComponent,
  ],
  templateUrl: './casa-scuola.component.html',
  styleUrl: './casa-scuola.component.css',
})
export class CasaScuolaComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;
  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);
  isNavBarVisible = this.navBarService.navBarState;

  inside = toSignal(this.galleriesService.getGallery('casa-scuola-inside'), { initialValue: [] });
  outside = toSignal(this.galleriesService.getGallery('casa-scuola-outside'), { initialValue: [] });
  map = toSignal(this.galleriesService.getGallery('casa-scuola-map'), { initialValue: [] });

  isAtBottom = false;

  onDescriptionScroll(event: Event) {
    const el = event.target as HTMLElement;
    this.isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
  }

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
