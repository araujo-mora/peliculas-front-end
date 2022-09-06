import { Component, OnInit } from '@angular/core';
import { crearPeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.scss']
})
export class CrearPeliculaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(pelicula: crearPeliculaDTO): void{
    console.log(pelicula);
  }

}
