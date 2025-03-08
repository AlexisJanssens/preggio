// nav-bar.service.ts
import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private _navBarVisible = signal(true);

  public navBarState: Signal<boolean> = this._navBarVisible.asReadonly();

  public showNavBar(): void {
    this._navBarVisible.set(true);
  }

  public hideNavBar(): void {
    this._navBarVisible.set(false);
  }
}
