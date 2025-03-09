import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-full-screen-slider',
  imports: [FontAwesomeModule],
  templateUrl: './full-screen-slider.component.html',
  styleUrl: './full-screen-slider.component.css',
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
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FullScreenSliderComponent implements OnInit, OnDestroy {
  images: string[] = [];
  currentIndex: number = 0;
  isVisible: boolean = false;

  private autoplayInterval: any;
  private autoplayEnabled: boolean = false;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTimes = faTimes;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  open(images: string[], startIndex: number = 0): void {
    this.images = images;
    this.currentIndex = startIndex;
    this.isVisible = true;
    document.body.style.overflow = 'hidden'; // Prevent page scrolling
    console.log(this.currentIndex, this.images);
  }

  close(): void {
    this.isVisible = false;
    document.body.style.overflow = ''; // Restore page scrolling
    this.stopAutoplay();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.stopAutoplay();
  }

  previousSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.autoplayEnabled = true;
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoplay(): void {
    this.autoplayEnabled = false;
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  toggleAutoplay(): void {
    if (this.autoplayEnabled) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
  }
}
