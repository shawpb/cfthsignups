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
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { VerifyinfoComponent } from './verifyinfo/verifyinfo.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/authguard';
import { AuthService } from './Services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgencyinfoComponent } from './agencyinfo/agencyinfo.component';
import { HttpClientModule } from '@angular/common/http';
import { Globals } from './globals';
import { UnAuthGuardService } from './guards/unauthguard';
import { ReportsComponent } from './reports/reports.component';
import { AdminGuardService } from './guards/adminGuard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SignupformComponent,
    VerifyinfoComponent,
    LoginComponent,
    AgencyinfoComponent,
    ReportsComponent,
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
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    UnAuthGuardService,
    AdminGuardService,
    AuthService,
    Globals,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
