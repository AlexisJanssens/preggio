import { NavBarService } from './../../../shared/nav-bar.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageContainer') pageContainer!: ElementRef;

  private scrollListener: any;
  private navBarService = inject(NavBarService);

  private windowSize: number = window.innerHeight;

  public isNavBarVisible = this.navBarService.navBarState;

  ngAfterViewInit(): void {
    this.scrollListener = this.onScroll.bind(this);
    this.pageContainer.nativeElement.addEventListener(
      'scroll',
      this.scrollListener
    );

    console.log(this.pageContainer.nativeElement);
  }

  ngOnDestroy(): void {
    this.pageContainer.nativeElement.removeEventListener(
      'scroll',
      this.scrollListener
    );
  }

  private onScroll(event: Event): void {
    const scrollPosition = this.pageContainer.nativeElement.scrollTop;
    console.log(scrollPosition);

    if (scrollPosition > this.windowSize * 0.75) {
      this.navBarService.hideNavBar();
    } else {
      this.navBarService.showNavBar();
    }
  }
}
