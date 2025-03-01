import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { SliderComponent } from '../../shared/slider/slider.component';

@Component({
  selector: 'app-casa-scuola',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './casa-scuola.component.html',
  styleUrl: './casa-scuola.component.css',
})
export class CasaScuolaComponent {}
