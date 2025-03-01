import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() images: string[] = ['red', 'blue', 'green', 'yellow'];
  @Input() title: string = 'Slider';

  currentSlide = 0;
  private intervalId: number = 0;

  get transformStyle() {
    return `translateX(-${this.currentSlide * 400}px)`;
  }

  startSlider() {
    if (this.images.length === 0) {
      return;
    }

    if (this.currentSlide === this.images.length - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
  }

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.startSlider();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
