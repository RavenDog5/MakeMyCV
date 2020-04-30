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

  getAll(id: number): Observable < T[] > {
    // console.log('[GET] URL : ', this.API_URL + '/' + this.EntityEndpoint);
    return this.http.get < T[] > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }

  getOne(id: number): Observable < T > {
    // console.log('[GET] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    return this.http.get < T > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }

  add(entity: T): Observable < T > {
    // console.log('[ADD] URL : ', this.API_URL + '/' + this.EntityEndpoint);
    return this.http.post < T > (this.API_URL + '/' + this.EntityEndpoint, entity);
  }

  addDependant(entity: T, ownerId: number): Observable<T> {
    return this.http.post < T > (this.API_URL + '/' + this.EntityEndpoint + '/' + ownerId, entity);
  }

  edit(entity: T, id: number) {
    // console.log('[UPDATE] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    return this.http.put < T > (this.API_URL + '/' + this.EntityEndpoint + '/' + id, entity);
  }

  remove(id: number) {
    // console.log('[DELETE] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    return this.http.delete < T > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }

}
