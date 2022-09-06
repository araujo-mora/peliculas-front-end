import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.scss']
})
export class IndiceCinesComponent implements OnInit {

  columnsToShow = ['id', 'nombre', 'acciones'];
  cines: cineDTO[] = [];
  totalQuantity: string | null = "";
  currentPage: number = 1;
  recordsToShow: number = 10;
  errores: string[] = [];
  emptylegend: string = "No hay cines para mostrar";

  constructor( private cinesService: CinesService ) { }

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShow);
  }

  loadRecords(page: number, offset: number): void{
    this.cinesService.getByPage(page, offset).subscribe({
      next: (response: HttpResponse<cineDTO[]>) =>{ 
        this.cines = response.body? response.body : [];
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
    this.cinesService.delete(id).subscribe({
      next: () => { this.loadRecords(this.currentPage, this.recordsToShow); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }

}
