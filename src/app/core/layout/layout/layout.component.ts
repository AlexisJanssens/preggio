import { NavBarService } from './../../../shared/nav-bar.service';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  public navBarService = inject(NavBarService);

  public isNavBarVisible = this.navBarService.navBarState;
}
