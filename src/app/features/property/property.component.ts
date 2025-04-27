import { Component, inject, ViewChild } from '@angular/core';
import { SliderComponent } from '../../shared/slider/slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';

@Component({
  selector: 'app-property',
  imports: [SliderComponent, NavBarComponent, FullScreenSliderComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private navBarService = inject(NavBarService);
  isNavBarVisible = this.navBarService.navBarState;

  swimmingPool = [
    'assets/img/PROPRIETE/PISCINE/1IMG_7075_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/2IMG_7071_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/3IMG_6456_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/4IMG_6451_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/5IMG_6001_900.jpg',
    'assets/img/PROPRIETE/PISCINE/6IMG_8219._1200.jpg',
    'assets/img/PROPRIETE/PISCINE/7IMG_3392_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/8IMG_3376_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/9IMG_8295_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/10IMG_8222_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/11IMG_6026_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/12IMG_7065_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/13IMG_6017_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/14IMG_7068_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/15IMG_4801_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/16OB5584_1200.jpg',
    'assets/img/PROPRIETE/PISCINE/17IMG_4795_1200.jpg',
  ];

  gardens = [
    'assets/img/PROPRIETE/JARDINS/1HAMAC_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/2IMG_4806_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/3IMG_1629_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/4IMG_3544_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/5IMG_3547_900.jpg',
    'assets/img/PROPRIETE/JARDINS/6IMG_3540_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/7IMG_3631_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/8IMG_3633R_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/9IMG_3626_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/10IMG_1456_900.jpg',
    'assets/img/PROPRIETE/JARDINS/11IMG_3690_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/12IMG_4746_900.jpg',
    'assets/img/PROPRIETE/JARDINS/13IMG_4128_900.jpg',
    'assets/img/PROPRIETE/JARDINS/14IMG_7030_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/15IMG_4125_900.jpg',
    'assets/img/PROPRIETE/JARDINS/16IMG_1436_900.jpg',
    'assets/img/PROPRIETE/JARDINS/17IMG_1444_900.jpg',
    'assets/img/PROPRIETE/JARDINS/18IMG_4632_900.jpg',
    'assets/img/PROPRIETE/JARDINS/19IMG_9096_900.jpg',
    'assets/img/PROPRIETE/JARDINS/20IMG_4835_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/21IMG_6005_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/22IMG_4733_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/23IMG_6315_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/24IMG_6328_900.jpg',
    'assets/img/PROPRIETE/JARDINS/25IMG_6300_900.jpg',
    'assets/img/PROPRIETE/JARDINS/26IMG_7403_900.jpg',
    'assets/img/PROPRIETE/JARDINS/27IMG_9246_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/28IMG_9247_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/29IMG_9904_900.jpg',
    'assets/img/PROPRIETE/JARDINS/30IMG_1460_900.jpg',
    'assets/img/PROPRIETE/JARDINS/31IMG_1463_900.jpg',
    'assets/img/PROPRIETE/JARDINS/32IMG_9077_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/33IMG_8248_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/33IMG_9054_900.jpg',
    'assets/img/PROPRIETE/JARDINS/34IMG_1627_900.jpg',
    'assets/img/PROPRIETE/JARDINS/35IMG_2184_900.jpg',
    'assets/img/PROPRIETE/JARDINS/36IMG_2239_900.jpg',
    'assets/img/PROPRIETE/JARDINS/37IMG_3825_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/38IMG_6154_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/39IMG_4748_900.jpg',
    'assets/img/PROPRIETE/JARDINS/40IMG_4799_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/41IMG_3864_1200.jpg',
    'assets/img/PROPRIETE/JARDINS/42IMG_9283_1200.jpg',
  ];

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
    console.log('onImageSelected', event);
  }
}
