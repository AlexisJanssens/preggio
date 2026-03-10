import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review-card',
  imports: [FontAwesomeModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() description!: string;
  @Input() authorFirstName!: string;
  @Input() authorLastName!: string;
  @Input() picture: string = '';
  @Input() rating!: number;

  faStar = faStar;

  get stars(): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < this.rating);
  }

  get initials(): string {
    return (
      (this.authorFirstName?.[0] ?? '') + (this.authorLastName?.[0] ?? '')
    ).toUpperCase();
  }
}
