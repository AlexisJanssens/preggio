import { Component, Input } from '@angular/core';
import { NavBarPage } from './models';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() currentPage: string = 'Accueil';

  public pages: NavBarPage[] = [
    {
      title: 'Accueil',
      path: 'home',
    },
    {
      title: 'Casa Peppe',
      path: 'casa-peppe',
    },
    {
      title: 'Casa Scuola',
      path: 'casa-scuola',
    },
    {
      title: 'La propriété',
      path: 'property',
    },
    {
      title: 'Situation',
      path: 'location',
    },
    {
      title: 'Expériences',
      path: 'discoveries',
    },
    {
      title: 'Atmosphère',
      path: 'atmosphere',
    },
    {
      title: 'Contact',
      path: 'contact',
    },
  ];
}
