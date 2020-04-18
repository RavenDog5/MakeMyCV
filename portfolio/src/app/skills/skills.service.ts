import { ApiService } from '../api.service';
import { Skill } from './skills.model';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SkillService extends ApiService<Skill> {
    API_URL: string = environment.Api.entrypoint;
    EntityEndpoint = environment.Api.endpoints.skills;

    constructor(private HttpClient: HttpClient) {
        super(HttpClient);
    }
}
