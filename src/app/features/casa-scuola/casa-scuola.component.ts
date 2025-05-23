import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../shared/slider/slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-casa-scuola',
  standalone: true,
  imports: [
    CommonModule,
    SliderComponent,
    FullScreenSliderComponent,
    NavBarComponent,
  ],
  templateUrl: './casa-scuola.component.html',
  styleUrl: './casa-scuola.component.css',
})
export class CasaScuolaComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;
  private navBarService = inject(NavBarService);
  isNavBarVisible = this.navBarService.navBarState;

  inside = [
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/1SALON_IMG_3656_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/2SALON_IMG_3659_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/3SALON_IMG_3655_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/4SAM_IMG_2312-1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/5SAM-IMG_2310-1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/6CUISINE-IMG_2313h-1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/7CUISINE_MG_0166_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/8CUISINE_IMG_2299-1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/9CHAMBRE1_IMG_3747_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/10CHAMBRE1_IMG_3733_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/11CHAMBRE1_IMG_3740_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/12CHAMBRE2_IMG_4751_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/13CHAMBRE2_IMG_4663_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/14CHAMBRE2_IMG_4664_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/15CHAMBRE2_IMG_4672_900.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/16CHAMBRE2_IMG_4680_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/17CHAMBRE3_IMG_5042_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/18CHAMBRE3_IMG_5040_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/19CHAMBRE5_IMG_5040_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/20CHAMBRE5_IMG_5053_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/21CHAMBRE5_IMG_5043_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/22CHAMBRE5_IMG_5057_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/23CHAMBRE4h_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/24CHAMBRE2_IMG_4660_900.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/25SAM-IMG_2308-1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/26SAM_IMG_6347_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_INTERIEUR/27SALON_IMG_4994v_900.jpg',
  ];
  outside = [
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/1EXT_IMG_8521_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/2EXT_IMG_6056_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/3EXT_IMG_6054_900.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/4TERRASSE_IMG_4137_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/5TERRASSE_IMG_5972_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/6TERRASSE_IMG_2307_900.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/7TERRASSE_IMG_9274_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/8TERRASSE_IMG_5971_2_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/9TERRASSE_IMG_9276_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/10TERRASSE_IMG_5974_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/11TERRASSE_IMG_3780_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/12TERRASSE_IMG_3782_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/13JARDIN_IMG_9286_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/14JARDIN_IMG_9289_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/15EXT_IMG_9305_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/16EXT_IMG_9306_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/17TERRASSE_IMG_9307_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/18EXT_IMG_4716_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/19EXT_IMG_5952R_900.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/20EXT_IMG_4671_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/21EXT_IMG_4135_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_EXTERIEUR/22EXT_IMG_4833_1200.jpg',
  ];

  map = [
    'assets/img/SCUOLA/SCUOLA_PLAN/1SCUOLA_PLAN_REZ_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_PLAN/2SCUOLA_PLAN_ETAGE1_1200.jpg',
    'assets/img/SCUOLA/SCUOLA_PLAN/3SCUOLA_PLAN_ETAGE2_1200.jpg',
  ];

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
    console.log('onImageSelected', event);
  }
}
