import { Observable } from 'rxjs';

export interface IApiService<T> {
    // VARIABLES
    API_URL: string;
    EntityEndpoint: string;

    // FUNCTIONS
    getAll(): Observable<T[]>;
    getOne(id: number): Observable<T>;
    add(entity: T): Observable<T>;
    edit(entity: T, id: number);
    remove(id: number);
  }
