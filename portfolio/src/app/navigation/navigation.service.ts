import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private authService: AuthService) { }


  public getUserConnected() {
    console.log('User connected : ', this.authService.userConnected);
    return this.authService.userConnected;
  }

  public getRoutes() {
    if (this.authService.isLoggedIn()) {
      return environment.routes.logged;
    } else {
      return environment.routes.notLogged;
    }

  }

}
