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

    // Hash email
    // const hash = bcrypt.hashSync(authResult.user.email, 10);

    localStorage.setItem('idToken', authResult.user.token);
    
    // console.log('RESULT : ', authResult);
    this.userConnected = {
      username: authResult.user.username,
      avatar: authResult.user.avatar,
      email: authResult.user.email,
      token: authResult.user.token
    };
    // console.log('AUTHSERVICE');
    // console.log('User Connected Infos :', this.userConnected);
  }

  register(newUser: User): Observable<any> {
    return this.http.post(this.API_URL + '/' + this.endPointRegister, newUser);
  }

  logout() {
    localStorage.removeItem('idToken');
    this.userConnected = null;
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
