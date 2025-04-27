import { Component, inject } from '@angular/core';
import { SliderComponent } from '../../shared/slider/slider.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../../shared/nav-bar.service';

@Component({
  selector: 'app-property',
  imports: [SliderComponent, NavBarComponent],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  private navBarService = inject(NavBarService);
  isNavBarVisible = this.navBarService.navBarState;
}
