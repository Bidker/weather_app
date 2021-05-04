import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  private baseurl = 'http://127.0.0.1:8001';
  token: string;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.setLoggedIn(true, this.token);
    }
  }

  login = (user: any) => {
    return this.doAuthOperation(user, '/rest-auth/login/');
  }

  register = (user: any) => {
    return this.doAuthOperation(user, '/rest-auth/registration/');
  }

  doAuthOperation = (user: any, route: string) => {
    return this.http.post(`${this.baseurl}${route}`, user);
  }

  logout = () => {
    this.setLoggedIn(false);
    delete this.token;

    localStorage.clear();
    this.router.navigate(['/']);
  }

  refreshToken = () => {
    const token = localStorage.getItem('userToken');
    return this.http.post(`${this.baseurl}/api-token-refresh/`, {token});
  }

  successLogin = (response: any) => {
    if (response.token !== undefined) {
      this.setLoginData(response);
      localStorage.setItem('userData', JSON.stringify(response.user));
      this.router.navigateByUrl('/weather_search').then((r) => {console.log(r); });
    }
  }

  setLoginData = (response: any) => {
    this.setLoggedIn(true, response.token);
    localStorage.setItem('userToken', this.token);
  }

  setLoggedIn = (loggedIn: boolean, token?: string) => {
    this.isLoggedIn = loggedIn;
    this.token = token;
  }
}
