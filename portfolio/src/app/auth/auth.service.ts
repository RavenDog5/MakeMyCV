import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import * as moment from 'moment';
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
    return this.http.post(this.API_URL + '/' + this.endPointLogin, user);
  }

  setSession(authResult): void {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    // Affectation des infos utilisateur
    const stock = authResult.user_id.split('_');
    this.userConnected = {
      id: stock[1],
      username: authResult.username,
      avatar: authResult.avatar,
      email: authResult.email
    };
    console.log('AUTHSERVICE');
    console.log('User Connected Infos :' + this.userConnected);
  }

  register(newUser: User): Observable<any> {
    return this.http.post(this.API_URL + '/' + this.endPointRegister, newUser);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
      return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
