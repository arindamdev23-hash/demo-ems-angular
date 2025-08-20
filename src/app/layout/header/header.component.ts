import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  // Use signal-based check
  isAuthenticated = computed(() => this.auth.isAuthenticated());

  logout(): void {
    // this.auth.clearToken();
    this.router.navigate(['/login']);
  }
}
