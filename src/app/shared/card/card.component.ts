import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title!: string;
  @Input() titleColor: string = 'white';
  @Input() link!: string;
  @Input() pathLink!: string;
  @Input() noLink: boolean = false;
  @Input() imagePath!: string;
  @Output() onCardClick = new EventEmitter<string>();

  cardClicked() {
    this.onCardClick.emit(this.title);
    console.log('Card clicked:', this.title);
  }
}
