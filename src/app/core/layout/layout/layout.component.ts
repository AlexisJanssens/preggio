// layout.component.ts
import { NavBarService } from './../../../shared/nav-bar.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('pageContainer') pageContainer!: ElementRef;

  private scrollListener: any;
  private navBarService = inject(NavBarService);
  private router = inject(Router);
  private routerSub!: Subscription;

  private windowSize: number = window.innerHeight;

  public isNavBarVisible = this.navBarService.navBarState;

  ngAfterViewInit(): void {
    this.scrollListener = this.onScroll.bind(this);
    this.pageContainer.nativeElement.addEventListener(
      'scroll',
      this.scrollListener
    );

    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.pageContainer.nativeElement.scrollTop = 0;
      });
  }

  ngOnDestroy(): void {
    this.pageContainer.nativeElement.removeEventListener(
      'scroll',
      this.scrollListener
    );
    this.routerSub?.unsubscribe();
  }

  private onScroll(): void {
    const scrollPosition = this.pageContainer.nativeElement.scrollTop;
    console.log(scrollPosition);

    if (scrollPosition > this.windowSize * 0.75) {
      this.navBarService.hideNavBar();
    } else {
      this.navBarService.showNavBar();
    }
  }
}
