import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  loginForm!: FormGroup;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']); // or any other protected route
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    const requestBody = { username: email, password };
    this.authService.login(requestBody).subscribe({
      next: response => {
        localStorage.setItem(this.authService.userKey, JSON.stringify(response));
        this.toastr.success('Login successful', 'Welcome');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.toastr.error('Invalid email or password', 'Login Failed');
        console.log('err', err);
      },
    });
  }
}
