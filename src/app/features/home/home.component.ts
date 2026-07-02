import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../shared/card/card.component';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { ReviewsCarouselComponent, Review } from '../../shared/reviews-carousel/reviews-carousel.component';
import { DotsLoaderComponent } from '../../shared/dots-loader/dots-loader.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    FadeSliderComponent,
    ReviewsCarouselComponent,
    DotsLoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private galleriesService = inject(GalleriesService);

  protected imagePaths = {
    scuola: 'assets/img/VIGNETTESpageaccueil_webp/VIGNETTE2-IMG_6993_SCUOLA_400.webp',
    peppe: 'assets/img/VIGNETTESpageaccueil_webp/VIGNETTE1-IMG_6629%202R_PEPPE_400.webp',
    piscine: 'assets/img/VIGNETTESpageaccueil_webp/VIGNETTE3PISCINE_IMG_8208_PROPRIETE_400.webp',
  };

  reviews: Review[] = [
    { authorFirstName: 'Elise', description: 'Ce coin de paradis est absolument parfait. La maison est charmante, très joliment décorée, ultra équipée. Il y a même des livres et jeux pour enfants en français ! Le must de la maison est une vue à couper le souffle sur les collines d’Ombrie. ' },

    { authorFirstName: 'Sibylle', description: 'Petit havre de paix au milieu de nulle part ! La maison est superbement situé dans la campagne, la piscine est parfaite, les lits sont très bons...' },
    { authorFirstName: 'Sophie', description: 'Très agréable séjour dans une maison de charme dans un environnement exceptionnel. Propriétaire très sympathique. Très bons échanges.' },
    { authorFirstName: 'Catherine', description: 'Tout a déjà été dit. Ce que nous avons adoré un bel environnement avec de superbes vues. Piscine parfaite et belle, esthétique où chaque coin est rendu incroyablement beau. Nous avons adoré et serions ravis de revenir…' },
    { authorFirstName: 'Andreas', description: 'Une adresse rare, entre nature sauvage et confort moderne. On se sent vraiment dépaysé.' },
    { authorFirstName: 'Katharina', description: '… un petit paradis ombrien… Nous sommes allés dans de nombreuses maisons de vacances, mais nous n’en avons pas trouvé une aussi bien équipée que celle-ci. Malgré la canicule de cet été, avec la brise rafraîchissante, la piscine et les anciens murs épais de la maison, ce n’était jamais trop chaud. Nuits étoilées avec des étoiles filantes bien visibles, un agréable salon ombragé, absence de moustiques, une vue imprenable sur les bois et les collines environnantes, la vie sauvage le long de la route, ce sont les bons souvenirs de ces vacances qui resteront dans nos cœurs.' },
    { authorFirstName: 'Mathieu', description: 'Villa perdue dans un endroit calme et magique à 2 pas de la Toscane.Un endroit où l’on pourra se ressourcer et passer de beaux moments en famille. Un petit havre de paix.À noter que la maison est vraiment bien équipée.' },
    { authorFirstName: 'Mathilde', description: "Nous avons passé une magnifique semaine dans cette jolie maison. Nous avons pu découvrir cette belle région d'Ombrie tout en profitant de la belle nature et des paysages magnifiques. La piscine a beaucoup plu aux enfants ainsi que les bons raisins sur la treille. La maison était très bien équipée et confortable. Merci de cet accueil." },
  ];

  slider = toSignal(this.galleriesService.getGallery('ACCUEIL_SLIDE'), { initialValue: [] });
}
