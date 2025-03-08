import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-fade-slider',
  imports: [],
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
export class FadeSliderComponent implements OnInit, OnDestroy {
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

  private _isAutoplay = true;
  private autoplayInterval: any;

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
  ngOnInit(): void {
    this.startAutoplay();
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
}
