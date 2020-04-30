import { ApiService } from '../api.service';
import { Skill } from './skills.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    API_URL: string = environment.Api.entrypoint;
    EntityEndpoint = environment.Api.endpoints.skills;

    constructor(private http: HttpClient) { }

    getAll(): Observable < Skill[] > {
        // console.log('[GET] URL : ', this.API_URL + '/' + this.EntityEndpoint);
        return this.http.get < Skill[] > (this.API_URL + '/' + this.EntityEndpoint);
      }

      getOne(id: number): Observable < Skill > {
        // console.log('[GET] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
        return this.http.get < Skill > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
      }

      add(entity: Skill): Observable < Skill > {
        // console.log('[ADD] URL : ', this.API_URL + '/' + this.EntityEndpoint);
        return this.http.post < Skill > (this.API_URL + '/' + this.EntityEndpoint, entity);
      }

      addDependant(entity: Skill, ownerId: number): Observable<Skill> {
        return this.http.post < Skill > (this.API_URL + '/' + this.EntityEndpoint + '/' + ownerId, entity);
      }

      edit(entity: Skill, id: number) {
        // console.log('[UPDATE] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
        return this.http.put < Skill > (this.API_URL + '/' + this.EntityEndpoint + '/' + id, entity);
      }

      remove(id: number) {
        // console.log('[DELETE] URL : ', this.API_URL + '/' + this.EntityEndpoint + '/' + id);
        return this.http.delete < Skill > (this.API_URL + '/' + this.EntityEndpoint + '/' + id);
      }
}
