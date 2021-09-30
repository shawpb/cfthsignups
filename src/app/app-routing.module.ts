import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignupformComponent } from './signupform/signupform.component';
import { UnAuthGuardService } from './guards/unauthguard';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminGuardService } from './guards/adminGuard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [UnAuthGuardService] },
  {
    path: 'signup',
    component: SignupformComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
