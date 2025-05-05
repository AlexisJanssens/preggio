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
    pepe: 'assets/img/ACCUEIL/VIGNETTESpageaccueil/VIGNETTE1-IMG_6629 2R_PEPPE_400.jpg',
    scuola:
      'assets/img/ACCUEIL/VIGNETTESpageaccueil/VIGNETTE2-IMG_6993_SCUOLA_400.jpg',
  };

  titleColor = '#607877';

  currentContact: string = 'none';

  changeCurrentContact(contact: string) {
    console.log('Contact clicked:', contact);

    this.currentContact = contact;
  }
}
