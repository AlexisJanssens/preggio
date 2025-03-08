import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavBarService } from '../../shared/nav-bar.service';
import { SliderComponent } from '../../shared/slider/slider.component';
import { CardComponent } from '../../shared/card/card.component';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, FadeSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  imagePaths = {
    pepe: '/assets/img/CASAPEPPE/bg_CASAPEPPE_1920.jpg',
    scuola: '/assets/img/SCUOLA/Casascuola_IMG_8298.jpg',
    situation: 'assets/img/SITUATION/IMG_1079cad.jpg',
  };

  sliders = [
    '../../../../public/assets/img/ACCUEIL/drone_bg1.jpg',
    '../../../../public/assets/img/ACCUEIL/drone_bg2.jpg',
    '../../../../public/assets/img/ACCUEIL/drone_bg3.jpg',
    '../../../../public/assets/img/ACCUEIL/drone_bg4.jpg',
  ];
}
