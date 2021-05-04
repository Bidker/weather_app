import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherSearchService {

  constructor(private authService: AuthService) {
  }

  onLogout = () => {
    this.authService.logout();
  }
}
