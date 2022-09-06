import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.scss']
})
export class IndiceActoresComponent implements OnInit {

  columnsToShow = ['id', 'nombre', 'acciones'];
  actores: actorDTO[] = [];
  totalQuantity: string | null = "";
  currentPage: number = 1;
  recordsToShow: number = 10;
  errores: string[] = [];
  emptylegend: string = "No hay actores para mostrar";

  constructor(private actoresService: ActoresService) { }

  ngOnInit(): void {
    this.loadRecords(this.currentPage, this.recordsToShow);
  }

  loadRecords(page: number, offset: number): void{
    this.actoresService.getByPage(page, offset).subscribe({
      next: (response: HttpResponse<actorDTO[]>) =>{ 
        this.actores = response.body? response.body : [];
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
    this.actoresService.delete(id).subscribe({
      next: () => { this.loadRecords(this.currentPage, this.recordsToShow); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }

}
