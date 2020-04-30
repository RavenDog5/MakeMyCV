import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string =  environment.Api.entrypoint;
  endPointLogin: string = environment.Api.endpoints.login;
  endPointRegister: string = environment.Api.endpoints.register;
  endPointPassword: string = environment.Api.endpoints.password;
  endPointAdress: string = environment.Api.endpoints.adress;
  userConnected = null;
  idUser: number;

  constructor(private http: HttpClient) { }



  getAdresseViaApi(adr: string) {
    return this.http.get(this.API_URL + '/' + this.endPointAdress + '/' + adr);
  }


  getPasswordGenerated() {
    return this.http.get<any>(this.API_URL + '/' + this.endPointPassword);
  }

  login(mail: string, pass: string) {
    const user = {
      email: mail,
      password: pass
    };
    // console.log('user to log : ', user);
    return this.http.post(this.API_URL + '/' + this.endPointLogin, user);
  }

  setSession(authResult): void {
    localStorage.setItem('idToken', authResult.user.token);
    this.userConnected = {
      id: -1,
      username: authResult.user.username,
      avatar: authResult.user.avatar,
      email: authResult.user.email,
      token: authResult.user.token
    };
    // TEST
    console.log('[auth.service.ts] userConnected : ', this.userConnected);
  }

  register(newUser: User): Observable<any> {
    return this.http.post(this.API_URL + '/' + this.endPointRegister, newUser);
  }

  logout() {
    localStorage.removeItem('idToken');
    this.userConnected = null;
  }

  getByEmail(email: string): Observable<any> {
    return this.http.get(this.API_URL + '/' + this.endPointRegister + '/' + email);
  }

  public isLoggedIn(): boolean {
    if (this.userConnected != null) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedOut(): boolean {
      return !this.isLoggedIn();
  }

}
