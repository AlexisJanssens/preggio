import { Component, Input } from '@angular/core';
import { DotsLoaderComponent } from '../dots-loader/dots-loader.component';

@Component({
  selector: 'app-img',
  imports: [DotsLoaderComponent],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css',
})
export class ImgComponent {
  @Input() src = '';
  @Input() alt = '';
  /** When true, image displays at its natural height (no fixed container) */
  @Input() natural = false;

  loaded = false;
}
