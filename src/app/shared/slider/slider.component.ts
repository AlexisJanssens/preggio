import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-slider',
  imports: [FontAwesomeModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  @Input() images: string[] = ['red', 'blue', 'green', 'yellow'];
  @Input() title: string = 'Slider';

  currentSlide = 0;

  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;

  private intervalId: number = 0;

  get transformStyle() {
    return `translateX(-${this.currentSlide * 400}px)`;
  }

  // startSlider() {
  //   if (this.images.length === 0) {
  //     return;
  //   }

  //   if (this.currentSlide === this.images.length - 1) {
  //     this.currentSlide = 0;
  //   } else {
  //     this.currentSlide++;
  //   }
  // }

  // ngOnInit(): void {
  //   this.intervalId = window.setInterval(() => {
  //     this.startSlider();
  //   }, 3000);
  // }

  // ngOnDestroy(): void {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }

  nextSlide() {
    console.log('nextSlide');

    if (this.currentSlide === this.images.length - 1) {
      this.currentSlide = 0;
    }
    this.currentSlide++;
  }

  previousSlide() {
    console.log('previousSlide');
    if (this.currentSlide === 0) {
      this.currentSlide = this.images.length - 1;
    }
    this.currentSlide--;
  }
}
