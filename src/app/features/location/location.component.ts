import { Component, ViewChild, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { FullScreenSliderComponent } from '../../shared/full-screen-slider/full-screen-slider.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-location',
  imports: [FadeSliderComponent, FullScreenSliderComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  @ViewChild(FullScreenSliderComponent)
  fullScreenSlider!: FullScreenSliderComponent;

  private galleriesService = inject(GalleriesService);

  slider = toSignal(this.galleriesService.getGallery('MONTE_TEZIO'), { initialValue: [] });

  // Villes associées à chaque photo (à remplacer quand le contenu sera bon)
  private cities: { name: string; dist: string }[] = [
    { name: 'Monte Tezio', dist: '± 5 km' },
    { name: 'Perugia', dist: '± 35 km' },
    { name: 'Assisi', dist: '± 50 km' },
    { name: 'Lago Trasimeno', dist: '± 15 km' },
    { name: 'Gubbio', dist: '± 45 km' },
    { name: 'Cortona', dist: '± 35 km' },
    { name: 'Montone', dist: '± 30 km' },
  ];

  currentCity = this.cities[0].name;
  currentDist = this.cities[0].dist;

  onSlideChange(index: number): void {
    const city = this.cities[index % this.cities.length];
    this.currentCity = city.name;
    this.currentDist = city.dist;
  }

  onImageSelected(event: { images: string[]; index: number }) {
    this.fullScreenSlider.open(event.images, event.index);
  }
}
