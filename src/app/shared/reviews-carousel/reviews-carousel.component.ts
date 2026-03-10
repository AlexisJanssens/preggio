import { Component, Input, computed, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ReviewCardComponent } from '../review-card/review-card.component';

export interface Review {
  description: string;
  authorFirstName: string;
  authorLastName: string;
  picture: string;
  rating: number;
}

@Component({
  selector: 'app-reviews-carousel',
  imports: [FontAwesomeModule, ReviewCardComponent],
  templateUrl: './reviews-carousel.component.html',
  styleUrl: './reviews-carousel.component.css',
})
export class ReviewsCarouselComponent {
  @Input() reviews: Review[] = [];
  @Input() title: string = 'Avis de nos hôtes';

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  currentPage = signal(0);

  readonly visibleCount = 3;
  readonly cardWidth = 300;
  readonly gap = 24; // 1.5rem

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.reviews.length / this.visibleCount));
  }

  get pages(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i);
  }

  get translateX(): string {
    const offset = this.currentPage() * this.visibleCount * (this.cardWidth + this.gap);
    return `translateX(-${offset}px)`;
  }

  prev(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
    }
  }

  next(): void {
    if (this.currentPage() < this.pageCount - 1) {
      this.currentPage.update(p => p + 1);
    }
  }

  goTo(page: number): void {
    this.currentPage.set(page);
  }
}
