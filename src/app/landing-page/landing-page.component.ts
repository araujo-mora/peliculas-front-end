import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  peliculasEnCines: any;
  peliculasProximosEstrenos: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
      this.peliculasEnCines = [
      {
        titulo: 'Spider-Man',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster: 'assets/img/Spider-Man.jpg'
      },
      {
        titulo: 'Moana',
        fechaLanzamiento: new Date('2016-11-14'),
        precio: 300.99,
        poster: 'assets/img/Moana.jpg'
      },
      { titulo: 'Han Solo', enCines: false, proximosEstrenos: false, generos: [1], poster: 'assets/img/Han-Solo.jpg' }
    ]
  }

}
