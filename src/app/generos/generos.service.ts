import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { crearGeneroDTO, generoDTO } from './genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private apiURL = `${environment.apiURL}generos`;
  
  constructor(private http: HttpClient) { }

  public add(genero: crearGeneroDTO){
    return this.http.post(this.apiURL, genero);
  }

  public getAll(): Observable<HttpResponse<generoDTO[]>>{
    return this.http.get<generoDTO[]>(this.apiURL, {observe: 'response'});
  }

  public getByPage(page: number, offset: number): Observable<HttpResponse<generoDTO[]>>{
    let params = new HttpParams();
    params = params.append('pagina', page.toString());
    params = params.append('recordsPorPagina', offset.toString());
    return this.http.get<generoDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public getById(id: number): Observable<generoDTO>{
    return this.http.get<generoDTO>(`${this.apiURL}/${id}`);
  }

  public update(id: number | undefined, genero: crearGeneroDTO){
    return this.http.put(`${this.apiURL}/${id}`, genero);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
