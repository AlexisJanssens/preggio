import { Component, inject } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    FadeSliderComponent,
    NavBarComponent,
    NavBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private navBarService = inject(NavBarService);

  isNavBarVisible = this.navBarService.navBarState;

  imagePaths = {
    pepe: 'assets/img/ACCUEIL/VIGNETTESpageaccueil/VIGNETTE1-IMG_6629 2R_PEPPE_400.jpg',
    scuola:
      'assets/img/ACCUEIL/VIGNETTESpageaccueil/VIGNETTE2-IMG_6993_SCUOLA_400.jpg',
    situation:
      'assets/img/ACCUEIL/VIGNETTESpageaccueil/VIGNETTE3-IMG_1030_SITUATION_400.jpg',
  };

  slider = [
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/1maisonspiscine_1718360272159R_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/2maisons4465_R_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/3maisons_IMG_7093_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/4JARDIN_IMG_9228_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/5CASASCUOLA_IMG_9111_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/6VUE_IMG_0015_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/7PISCINE_IMG_8209_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/8JARDINS_IMG_4806_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/9CASAPEPPE_IMG_7367_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/10CASAPEPPE_IMG_7103_1200x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/11chemin_IMG_7051_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/12TERRASSE_IMG_9903_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/13JARDIN_IMG_6325_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/14TERRASSE_IMG_5976_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/15TERRASSE_IMG_6053_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/16JARDIN_IMG_6148_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/17PISCINEsoir_IMG_4794_1920x108.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/18hameau_IMG_1030_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/19olives_IMG_8248_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/20JARDIN_Hamac1R_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/21IMG_7460_SCUOLAcad_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/22VUE_IMG_4750_1920x1080.jpg',
    'assets/img/ACCUEIL/ACCUEIL_SLIDE/23IMG_6993_SCUOLA_1920x1080.jpg',
  ];
}
