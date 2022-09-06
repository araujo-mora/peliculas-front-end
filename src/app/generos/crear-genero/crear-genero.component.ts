import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { crearGeneroDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.scss']
})
export class CrearGeneroComponent {

  errores: string[] = [];
  constructor( 
    private router: Router,
    private generosService: GenerosService 
  ) { }

  saveChanges(genero: crearGeneroDTO): void{
    this.generosService.add(genero).subscribe({
      next: () => { this.router.navigate(['/generos']); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
    
  }

}
