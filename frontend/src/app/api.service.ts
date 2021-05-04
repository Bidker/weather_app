import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl = 'http://127.0.0.1:8001';

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) {
  }

  request = (method: string, route: string, data?: any) => {
    const successMethod = () => {};
    const errorMethod = (error) => {
      if (error.status !== 401) { return error; }

      this.authService.refreshToken().subscribe(
        (response) => {
          this.authService.setLoginData(response);
          this.request(method, route, data);
        },
        (err) => err
      );
    };

    if (method === 'GET') {
      return this.http.get(route, data).subscribe(successMethod, errorMethod);
    }

    const header = {Authorization: `JWT ${this.authService.token}`};

    return this.http.request(method, `${this.baseurl}${route}`, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header,
    }).subscribe(successMethod, errorMethod);
  }

  get = (route: string, data?: any) => {
    const header = (this.authService.isLoggedIn) ? {Authorization: `JWT ${this.authService.token}`} : undefined;

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(`${this.baseurl}${route}`, {
      responseType: 'json',
      headers: header,
      params
    });
  }
}
