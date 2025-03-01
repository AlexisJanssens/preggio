import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SliderComponent } from '../../shared/slider/slider.component';

@Component({
  selector: 'app-casa-pepe',
  imports: [CommonModule, SliderComponent],
  templateUrl: './casa-pepe.component.html',
  styleUrl: './casa-pepe.component.css',
})
export class CasaPepeComponent {}
