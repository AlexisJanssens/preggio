import { Injectable, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  currentUser = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, (user) => this.currentUser.set(user));
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigate(['/admin/discoveries']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/admin']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}
