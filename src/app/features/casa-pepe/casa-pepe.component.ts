import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';

@Component({
  selector: 'app-casa-pepe',
  imports: [
    CommonModule,
    SliderComponent,
    FullScreenSliderComponent,
    NavBarComponent,
  ],
  templateUrl: './casa-pepe.component.html',
  styleUrl: './casa-pepe.component.css',
})
export class CasaPepeComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private navBarService = inject(NavBarService);
  isNavBarVisible = this.navBarService.navBarState;

  inside = [
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/1PEPPE_salon-20220624_144449_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/2PEPPE_salleamanger-IMG_4874_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/3PEPPE_cuisine_canap-cad_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/4PEPPE_cuisine_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/5PEPPE_cuisine-IMG_4872_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/6PEPPE_Salleamanger-R_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/7PEPPE_chambre1_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/8PEPPE_chambre1-IMG_4870_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/9PEPPE_chambre2-IMG_4868_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/10PEPPE_chambre3_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_INTERIEUR/11PEPPE_chambre4-IMG_4867_1200.jpg',
  ];

  outside = [
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/1-IMG_6629_2R_PEPPE_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/2PEPPE_IMG_1449_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/3IMG_7366_PEPPEcad_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/4PEPPE_Pergola_IMG_7124_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/5PEPPE_terrasse_IMG_1445_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/6PEPPE_terrasse_IMG_3851_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/7PEPPE_terrasse_IMG_4561_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/8PEPPE_terrasse_IMG_4877_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/9PEPPE_terrasse_IMG_7098_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/10PEPPE_terrasse_IMG_7103_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/11PEPPE_terrasse_IMG_7110_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/12PEPPE_terrasse_IMG_7123_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/13PEPPE_pergola_IMG_2323R_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/14PEPPE_TERRASSE_IMG_9902_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/15PEPPE_terrasse_IMG_4876_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/16terrasse_IMG_4741_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/17PEPPE_IMG_7114_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/18terrasse_IMG_4725_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/19Terrasse_IMG_7372_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/20PEPPE_terrasse_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/21PEPPE_IMG_6631_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/22PEPPE_IMG_7095_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_EXTERIEUR/23PEPPE_IMG_1461_1200.jpg',
  ];

  map = [
    'assets/img/CASAPEPPE/PEPPE_PLAN/1PEPPE_PLAN_REZ_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_PLAN/2PEPPE_PLAN_ETAGE1_1200.jpg',
    'assets/img/CASAPEPPE/PEPPE_PLAN/3PEPPE_PLAN_ETAGE2_1200.jpg',
  ];

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
    console.log('onImageSelected', event);
  }
}
