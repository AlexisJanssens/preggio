import { Component, Input, signal, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent implements AfterViewInit {
  @Input() description!: string;
  @Input() authorFirstName!: string;
  @Input() rating?: number;
  @Input() picture?: string;
  @Input() authorLastName?: string;

  @ViewChild('descEl') descEl!: ElementRef<HTMLParagraphElement>;

  expanded = signal(false);
  overflows = signal(false);

  ngAfterViewInit(): void {
    const el = this.descEl.nativeElement;
    this.overflows.set(el.scrollHeight > el.offsetHeight);
  }

  toggle(): void {
    this.expanded.update(v => !v);
  }
}
