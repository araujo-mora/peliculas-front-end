import { Component, OnInit } from '@angular/core';
import { crearPeliculaDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.scss']
})
export class EditarPeliculaComponent implements OnInit {

  modelo: peliculaDTO = {
    titulo: 'Spider-man',
    resumen: '# Spider-man far from home\n now in london',
    enCines: true,
    trailer: 'https://www.youtube.com/watch?v=Nt9L1jCKGnE',
    fechaLanzamiento: new Date(),
    poster: 'assets/img/Spider-Man.jpg'
  };

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(pelicula: crearPeliculaDTO): void{
    console.log(pelicula);
  }

}
