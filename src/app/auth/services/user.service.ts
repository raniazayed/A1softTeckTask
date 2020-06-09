import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService,
    private router:Router) { }
  login(userData): Observable<any> {
    return this.http.post('login', userData);
  };
  saveUserCookies(userToken) {
    this.saveUserToken(userToken);
  }
  saveUserToken(userToken) {
    this.cookiesService.set('userToken', userToken, 30, '/')
  }
  getUserToken() {
    return this.cookiesService.get('userToken')
  }
  hasCookies() {
    if (this.getUserToken().length) return true;
    return false;
  }
  deleteUserToken() {
    this.cookiesService.delete('userToken', '/');
  }
  logout(){
    this.deleteUserToken();
    this.router.navigate(["/login"])
  }
}
