import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiService } from './iapi-service';


@Injectable({
  providedIn: 'root'
})

export class ApiService<T> implements IApiService < T > {

  API_URL: string;
  EntityEndpoint: string;

  constructor(private http: HttpClient) {}

  getAll(): Observable < T[] > {
    return this.http.get < T[] > (this.API_URL + '/' + this.EntityEndpoint);
  }

  getOne(id: number): Observable < T > {
    return this.http.get < T > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }

  add(entity: T): Observable < T > {
    return this.http.post < T > (this.API_URL + '/' + this.EntityEndpoint, entity);
  }

  edit(entity: T) {
    return this.http.put < T > (this.API_URL + '/' + this.EntityEndpoint , entity);
  }

  remove(id: number) {
    return this.http.delete < T > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }

}
