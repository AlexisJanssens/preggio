import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  private auth = inject(AuthService);

  email = '';
  password = '';
  error = signal('');
  loading = signal(false);

  async onSubmit(): Promise<void> {
    this.error.set('');
    this.loading.set(true);
    try {
      await this.auth.login(this.email, this.password);
    } catch {
      this.error.set('Email ou mot de passe incorrect.');
    } finally {
      this.loading.set(false);
    }
  }
}
