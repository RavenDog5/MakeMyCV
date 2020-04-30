import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Formation } from './formation.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService extends ApiService<Formation> {
  API_URL: string = environment.Api.entrypoint;
  EntityEndpoint = environment.Api.endpoints.formation;
  stock: Formation;

  constructor(private HttpClient: HttpClient) { super(HttpClient); }

}
