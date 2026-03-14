import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { CardComponent } from '../../shared/card/card.component';
import { GalleriesService } from '../../services/galleries.service';

@Component({
  selector: 'app-contact',
  imports: [NavBarComponent, CardComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private navBarService = inject(NavBarService);
  private galleriesService = inject(GalleriesService);

  isNavBarVisible = this.navBarService.navBarState;

  imagePaths = toSignal(
    this.galleriesService.getGalleryDoc('home-vignettes').pipe(
      map((g) => (g?.namedImages ?? { pepe: '', scuola: '' }) as { pepe: string; scuola: string })
    ),
    { initialValue: { pepe: '', scuola: '' } }
  );

  titleColor = '#607877';

  currentContact: string = 'none';

  changeCurrentContact(contact: string) {
    this.currentContact = contact;
  }
}
