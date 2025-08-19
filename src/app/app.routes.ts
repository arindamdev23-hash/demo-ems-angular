import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeeListComponent } from './features/employees/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './features/employees/employee-details/employee-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
];
