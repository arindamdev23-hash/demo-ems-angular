import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainLayoutComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-ems';
  private auth = inject(AuthService);
  private router = inject(Router);

  // Optional: routes where you don't want layout
  private excludedRoutes = ['/login', '/register'];
  private currentUrl = signal(this.router.url);

  constructor() {
    // Update currentUrl on navigation
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }

  readonly showLayout = computed(
    () => this.auth.isAuthenticated() && !this.excludedRoutes.includes(this.currentUrl()),
  );
}
