import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.scss']
})
export class IndiceGenerosComponent implements OnInit {

  columnsToShow = ['id', 'nombre', 'acciones'];
  generos: generoDTO[] = [];
  totalQuantity: string | null = "";
  currentPage: number = 1;
  recordsToShow: number = 10;
  errores: string[] = [];
  emptylegend: string = "No hay géneros para mostrar";

  constructor(private generosService: GenerosService) { }

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShow);
  }

  loadRecords(page: number, offset: number): void{
    this.generosService.getByPage(page, offset).subscribe({
      next: (response: HttpResponse<generoDTO[]>) =>{ 
        this.generos = response.body? response.body : [];
        this.totalQuantity = response.headers.get('TotalQuantity');
      },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }

  updatePage(event: PageEvent): void{
    this.currentPage = event.pageIndex + 1;
    this.recordsToShow = event.pageSize;
    this.loadRecords(this.currentPage, this.recordsToShow);
  }

  deleteRecords(id: number){
    this.generosService.delete(id).subscribe({
      next: () => { this.loadRecords(this.currentPage, this.recordsToShow); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }
}
