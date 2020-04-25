import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

    API_URL: string = environment.Api.entrypoint;
    EntityEndpoint = environment.Api.endpoints.account;

    constructor(private http: HttpClient) { }

    getAccount(id: number): Observable<any> {
      return this.http.get<any>(this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    }

    updateAccount(id: number, userData) {
      console.log('id : ', id);
      console.log('user data : ', userData);
      // return {id} ;
      return this.http.put<any>(this.API_URL + '/' + this.EntityEndpoint + '/' + id, userData);
    }
}
