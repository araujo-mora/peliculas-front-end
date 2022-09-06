import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineDTO, crearCineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiURL = `${environment.apiURL}cines`;
  
  constructor(private http: HttpClient) { }

  public add(cine: crearCineDTO){
    return this.http.post(this.apiURL, cine);
  }

  public getAll(): Observable<HttpResponse<cineDTO[]>>{
    return this.http.get<cineDTO[]>(this.apiURL, {observe: 'response'});
  }

  public getByPage(page: number, offset: number): Observable<HttpResponse<cineDTO[]>>{
    let params = new HttpParams();
    params = params.append('pagina', page.toString());
    params = params.append('recordsPorPagina', offset.toString());
    return this.http.get<cineDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public getById(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(`${this.apiURL}/${id}`);
  }

  public update(id: number | undefined, cine: crearCineDTO){
    return this.http.put(`${this.apiURL}/${id}`, cine);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
