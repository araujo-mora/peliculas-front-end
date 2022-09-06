import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dateFormatter } from '../utilidades/utilidades';
import { actorDTO, crearActorDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL = `${environment.apiURL}actores`;

  constructor(private http: HttpClient) { }

  public add(actor: crearActorDTO){
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  public getAll(): Observable<HttpResponse<actorDTO[]>>{
    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response'});
  }

  public getByPage(page: number, offset: number): Observable<HttpResponse<actorDTO[]>>{
    let params = new HttpParams();
    params = params.append('pagina', page.toString());
    params = params.append('recordsPorPagina', offset.toString());
    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public getById(id: number): Observable<actorDTO>{
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public update(id: number | undefined, actor: crearActorDTO){
    const formData = this.buildFormData(actor); 
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  
  private buildFormData(actor: crearActorDTO): FormData{
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if(actor.biografia){
      formData.append('biografia', actor.biografia);
    }
    if(actor.fechaNacimiento){
      formData.append('fechaNacimiento', dateFormatter(actor.fechaNacimiento));
    }
    if(actor.foto){
      formData.append('foto', actor.foto);
    }
    return formData;
  }
}
