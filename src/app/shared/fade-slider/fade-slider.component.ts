import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DotsLoaderComponent } from '../dots-loader/dots-loader.component';

@Component({
  selector: 'app-fade-slider',
  imports: [DotsLoaderComponent],
  templateUrl: './fade-slider.component.html',
  styleUrl: './fade-slider.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition('hidden => visible', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
      transition('visible => hidden', [
        style({ opacity: 1 }),
        animate('1s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FadeSliderComponent implements OnDestroy, OnChanges {
  @Input() contain = false;
  @Input() images: string[] = [];
  @Input() interval = 3000;
  @Input() showControls = true;
  @Input() fixed = false;
  @Input() currentSlideIndex = 0;
  @Input()
  public get isAutoplay() {
    return this._isAutoplay;
  }
  public set isAutoplay(value) {
    this._isAutoplay = value;
    if (value) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }
  @Output() slideChange = new EventEmitter<number>();
  @Output() imageClick = new EventEmitter<number>();

  ready = false;

  private _isAutoplay = true;
  private autoplayInterval: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.images.length > 0) {
      this.ready = false;
      const img = new Image();
      img.onload = () => { this.ready = true; };
      img.src = this.images[0];
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
    this.slideChange.emit(this.currentSlideIndex);
  }

  previousSlide(): void {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.images.length) % this.images.length;
    this.slideChange.emit(this.currentSlideIndex);
  }

  onImageClick(index: number): void {
    this.imageClick.emit(index);
  }
}
