import { ProfileComponent } from './features/account/profile/profile.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeeListComponent } from './features/employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './features/employees/employee-details/employee-details.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/authGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  // Auth routes
  { path: 'login', component: LoginComponent },
];
