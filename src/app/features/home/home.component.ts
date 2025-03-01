import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavBarService } from '../../shared/nav-bar.service';
import { SliderComponent } from '../../shared/slider/slider.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageContainer') pageContainer!: ElementRef;

  private scrollListener: any;
  private NavBarService = inject(NavBarService);

  private windowSize: number = window.innerHeight;

  ngAfterViewInit(): void {
    this.scrollListener = this.onScroll.bind(this);
    this.pageContainer.nativeElement.addEventListener(
      'scroll',
      this.scrollListener
    );
  }

  ngOnDestroy(): void {
    this.pageContainer.nativeElement.removeEventListener(
      'scroll',
      this.scrollListener
    );
  }

  private onScroll(event: Event): void {
    const scrollPosition = this.pageContainer.nativeElement.scrollTop;
    console.log('Position actuelle du scroll : ', scrollPosition);

    if (scrollPosition > this.windowSize * 0.75) {
      this.NavBarService.hideNavBar();
    } else {
      this.NavBarService.showNavBar();
    }
  }
}
