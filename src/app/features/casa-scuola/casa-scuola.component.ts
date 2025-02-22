import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-casa-scuola',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './casa-scuola.component.html',
  styleUrl: './casa-scuola.component.css',
})
export class CasaScuolaComponent {}
