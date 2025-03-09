import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SliderComponent } from '../../shared/slider/slider.component';

@Component({
  selector: 'app-casa-pepe',
  imports: [CommonModule, SliderComponent],
  templateUrl: './casa-pepe.component.html',
  styleUrl: './casa-pepe.component.css',
})
export class CasaPepeComponent {
  insideImgs = [
    'assets/img/CASAPEPPE/bg_CASAPEPPE_1920.jpg',
    'assets/img/CASAPEPPE/IMG_7366_PEPPE_1920.jpg',
    'assets/img/ACCUEIL/drone_bg1.jpg',
    'assets/img/ACCUEIL/drone_bg2.jpg',
    'assets/img/ACCUEIL/drone_bg3.jpg',
    'assets/img/ACCUEIL/drone_bg4.jpg',
  ];
}
