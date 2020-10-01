import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignupformComponent } from './signupform/signupform.component';
import { UnAuthGuardService } from './guards/unauthguard';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminGuardService } from './guards/adminGuard';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'signup',
    component: SignupformComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnAuthGuardService],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AdminGuardService],
  },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
