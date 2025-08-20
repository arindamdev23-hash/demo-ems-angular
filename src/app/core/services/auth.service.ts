import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string; // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string; // refreshToken in response and cookies
}

interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl = 'https://dummyjson.com/auth';
  public userKey = 'user';

  readonly isAuthenticatedUser = signal<boolean>(
    this.isBrowser() && !!localStorage.getItem(this.userKey),
  );
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(requestBody: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, requestBody);
  }

  isAuthenticated(): boolean {
    return this.isBrowser() && !!localStorage.getItem(this.userKey);
  }

  getUser(): LoginResponse | null {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}
