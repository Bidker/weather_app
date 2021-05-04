import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {LoginComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {WeatherSearchComponent} from './weather_search/weather-search.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './auth/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalRegistrationComponent} from './modal_registration/modal-registration.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    ModalRegistrationComponent,
    WeatherSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [LoginComponent],
  entryComponents: [ModalRegistrationComponent],
})
export class AppModule {
}
