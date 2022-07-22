import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { crearGeneroDTO } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.scss']
})
export class EditarGeneroComponent implements OnInit {

  modelo: crearGeneroDTO = { name: 'Acción' }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  saveForm(genero: crearGeneroDTO){
    console.log(genero);
    this.router.navigate(['/generos']);
  }
  
}
