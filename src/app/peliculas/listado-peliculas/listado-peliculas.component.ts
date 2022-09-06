import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.scss']
})
export class ListadoPeliculasComponent implements OnInit {

  @Input() peliculas: any;
  emptylegend: string = "No hay películas para mostrar";

  constructor() { }

  ngOnInit(): void {
  }

  remover(indicePelicula: number): void {
    this.peliculas.splice(indicePelicula, 1);
  }

}
