import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FadeSliderComponent } from '../fade-slider/fade-slider.component';

@Component({
  selector: 'app-slider',
  imports: [FontAwesomeModule, FadeSliderComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  @ViewChild(FadeSliderComponent) fadeSlider!: FadeSliderComponent;

  @Input() contain = false;
  @Input() images: string[] = [];
  @Input() title: string = 'Slider';
  @Input() autoplay = true;
  @Output() imageSelected = new EventEmitter<{
    images: string[];
    index: number;
  }>();

  currentSlide = 0;

  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;

  onSlideChange(index: number) {
    this.currentSlide = index;
  }

  nextSlide() {
    if (this.currentSlide === this.images.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }

    this.fadeSlider.isAutoplay = false;
  }

  prevSlide() {
    if (this.currentSlide === 0) {
      this.currentSlide = this.images.length - 1;
    } else {
      this.currentSlide--;
    }

    this.fadeSlider.isAutoplay = false;
  }

  onImageClick(index: number) {
    this.imageSelected.emit({ images: this.images, index: index });
  }
}
