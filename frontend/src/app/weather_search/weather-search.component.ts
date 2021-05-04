import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';
import {AuthService} from './../auth/auth.service';
import {rejects} from 'assert';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
})
export class WeatherSearchComponent {
  form: FormGroup;
  isSubscribeError = false;
  subscribeErrorsNotes: object;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public authService: AuthService,
  ) {
    this.authService = authService;
    this.form = this.fb.group({
      city: ['', Validators.required],
      county_code: ['', Validators.required],
    });
  }


  logout = () => {
    this.authService.logout();
  }

  subscribeCity = () => {
    this.isSubscribeError = false;
    this.subscribeErrorsNotes = {};

    const val = this.form.value;
    if (this.form.valid) {
      const name = `${val.city.toLowerCase()},${val.county_code.toLowerCase()}`;
      this.apiService.request('POST', '/city/', {name});
    }
  }
}
