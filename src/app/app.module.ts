import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SignupformComponent } from './signupform/signupform.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { VerifyinfoComponent } from './verifyinfo/verifyinfo.component';
import { AgencyformComponent } from './agencyform/agencyform.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/authguard';
import { AuthService } from './Services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SignupformComponent,
    VerifyinfoComponent,
    AgencyformComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
