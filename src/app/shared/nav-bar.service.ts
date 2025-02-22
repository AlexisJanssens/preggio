import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  constructor() {}

  public navBarState = signal<boolean>(true);

  hideNavBar(): void {
    this.navBarState.set(false);
  }

  showNavBar(): void {
    this.navBarState.set(true);
  }

  getNavBarState(): boolean {
    return this.navBarState();
  }
}
