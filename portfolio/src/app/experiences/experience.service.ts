import { Injectable } from '@angular/core';
import { Experience } from './experience.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  stockData: Experience;
  API_URL: string = environment.Api.entrypoint;
  EntityEndpoint = environment.Api.endpoints.experiences;

  constructor(private http: HttpClient) { }

  getAll(): Observable < Experience[] > {
    // console.log('[GET] URL : ', this.API_URL + '/' + this.EntityEndpoint);
    return this.http.get < Experience[] > (this.API_URL + '/' + this.EntityEndpoint);
  }

  getOne(id: number): Observable < Experience > {
    // console.log('[GET] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    return this.http.get < Experience > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }

  add(entity: Experience, ownerId: number): Observable<Experience> {
    console.log('entity passed in parameter : ', entity);
    console.log('Who wrote this ?', ownerId);
    return this.http.post < Experience > (this.API_URL + '/' + this.EntityEndpoint + '/' + ownerId, entity);
  }

  edit(entity: Experience, id: number) {
    // console.log('[UPDATE] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    return this.http.put < Experience > (this.API_URL + '/' + this.EntityEndpoint + '/' + id, entity);
  }

  remove(id: number) {
    // console.log('[DELETE] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
    return this.http.delete < Experience > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
  }
 
}
