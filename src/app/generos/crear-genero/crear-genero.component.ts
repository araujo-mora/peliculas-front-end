import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { crearGeneroDTO } from '../genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.scss']
})
export class CrearGeneroComponent {

  constructor( 
    private router: Router,
  ) { }

  saveForm(genero: crearGeneroDTO){
    console.log(genero);
    this.router.navigate(['/generos']);
  }

}
