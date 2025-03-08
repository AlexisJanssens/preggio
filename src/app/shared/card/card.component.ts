import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title!: string;
  @Input() link!: string;
  @Input() pathLink!: string;
  @Input() noLink: boolean = false;
  @Input() imagePath!: string;
}
