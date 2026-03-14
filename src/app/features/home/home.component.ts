import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { CardComponent } from '../../shared/card/card.component';
import { FadeSliderComponent } from '../../shared/fade-slider/fade-slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { ReviewsCarouselComponent, Review } from '../../shared/reviews-carousel/reviews-carousel.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    FadeSliderComponent,
    NavBarComponent,
    ReviewsCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);

  isNavBarVisible = this.navBarService.navBarState;

  reviews: Review[] = [
    { authorFirstName: 'Marie', authorLastName: 'Dupont', rating: 5, picture: '', description: 'Un séjour absolument magnifique, la vue sur les collines est à couper le souffle !' },
    { authorFirstName: 'Thomas', authorLastName: 'Bernard', rating: 5, picture: '', description: 'Piscine superbe, maisons très bien équipées. Nous reviendrons sans hésiter.' },
    { authorFirstName: 'Sophie', authorLastName: 'Martin', rating: 4, picture: '', description: 'Endroit calme et authentique, parfait pour se ressourcer en famille.' },
    { authorFirstName: 'Jean', authorLastName: 'Leroy', rating: 5, picture: '', description: 'La Toscane-Ombrie dans toute sa splendeur. Le hameau est un vrai coup de cœur.' },
    { authorFirstName: 'Claire', authorLastName: 'Fontaine', rating: 5, picture: '', description: 'Une adresse rare, entre nature sauvage et confort moderne. On se sent vraiment dépaysé.' },
    { authorFirstName: 'Luca', authorLastName: 'Rossi', rating: 5, picture: '', description: 'Posto meraviglioso, ospitalità eccellente. La piscina con vista sulle colline è indimenticabile.' },
    { authorFirstName: 'Isabelle', authorLastName: 'Morel', rating: 4, picture: '', description: 'Très bel endroit, bien isolé du bruit. La maison est spacieuse et joliment décorée.' },
    { authorFirstName: 'Marc', authorLastName: 'Girard', rating: 5, picture: '', description: 'Deux semaines inoubliables. Le coucher de soleil depuis la terrasse vaut le voyage à lui seul.' },
  ];

  slider = toSignal(this.galleriesService.getGallery('home-slider'), { initialValue: [] });

  imagePaths = toSignal(
    this.galleriesService.getGalleryDoc('home-vignettes').pipe(
      map((g) => (g?.namedImages ?? { pepe: '', scuola: '', situation: '' }) as { pepe: string; scuola: string; situation: string })
    ),
    { initialValue: { pepe: '', scuola: '', situation: '' } }
  );
}
