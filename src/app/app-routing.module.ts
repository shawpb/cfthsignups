import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignupformComponent } from './signupform/signupform.component';
import { VerifyinfoComponent } from './verifyinfo/verifyinfo.component';

import { AuthGuardService } from './guards/authguard';
import { AgencyformComponent } from './agencyform/agencyform.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'signup',
    component: SignupformComponent,
  },
  {
    path: 'agency',
    component: AgencyformComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: MainComponent },
  { path: 'verify', component: VerifyinfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
