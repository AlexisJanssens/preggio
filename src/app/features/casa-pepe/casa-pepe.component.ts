import { NavBarService } from './../../shared/nav-bar.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Output,
  viewChild,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-casa-pepe',
  imports: [],
  templateUrl: './casa-pepe.component.html',
  styleUrl: './casa-pepe.component.css',
})
export class CasaPepeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('bg1') bg1!: ElementRef;
  @ViewChild('bg2') bg2!: ElementRef;
  private scrollListener: any;
  private NavBarService = inject(NavBarService);

  private windowSize: number = window.innerHeight;

  ngAfterViewInit(): void {
    this.scrollListener = this.onScroll.bind(this);
    this.scrollContainer.nativeElement.addEventListener(
      'scroll',
      this.scrollListener
    );
  }

  ngOnDestroy(): void {
    this.scrollContainer.nativeElement.removeEventListener(
      'scroll',
      this.scrollListener
    );
  }

  private onScroll(event: Event): void {
    const scrollPosition = this.scrollContainer.nativeElement.scrollTop;
    console.log('Position actuelle du scroll : ', scrollPosition);

    if (scrollPosition > this.windowSize * 0.75) {
      this.NavBarService.hideNavBar();
    } else {
      this.NavBarService.showNavBar();
    }

    this.bg1.nativeElement.style.transform = `translateY(${
      scrollPosition * 0.5
    }px)`;
  }
}
