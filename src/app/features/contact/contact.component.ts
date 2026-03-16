import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-contact',
  imports: [NavBarComponent, CardComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private navBarService = inject(NavBarService);

  isNavBarVisible = this.navBarService.navBarState;

  imagePaths = {
    pepe: 'assets/img/vignettes/VIGNETTE1-IMG_6629%202R_PEPPE_400.webp',
    scuola: 'assets/img/vignettes/VIGNETTE2-IMG_6993_SCUOLA_400.webp',
  };

  titleColor = '#607877';

  currentContact: string = 'none';

  changeCurrentContact(contact: string) {
    this.currentContact = contact;
  }
}
