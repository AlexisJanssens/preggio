import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-contact',
  imports: [CardComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  imagePaths = {
    pepe: 'assets/img/VIGNETTESpageaccueil_webp/VIGNETTE1-IMG_6629%202R_PEPPE_400.webp',
    scuola: 'assets/img/VIGNETTESpageaccueil_webp/VIGNETTE2-IMG_6993_SCUOLA_400.webp',
  };

  titleColor = '#607877';

  currentContact: string = 'none';

  changeCurrentContact(contact: string) {
    this.currentContact = contact;
  }
}
