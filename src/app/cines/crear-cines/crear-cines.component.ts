import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { crearCineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cines',
  templateUrl: './crear-cines.component.html',
  styleUrls: ['./crear-cines.component.scss']
})
export class CrearCinesComponent {

  errores: string[] = [];
  constructor( 
    private router: Router,
    private cinesService: CinesService 
  ) { }

  saveChanges(cine: crearCineDTO): void{
    this.cinesService.add(cine).subscribe({
      next: () => { this.router.navigate(['/cines']); },
      error: err => { 
        this.errores = parseHttpError(err);
        console.error(this.errores[0]);
      },
      complete: () => {console.info('Successful'); }
    });
    
  }
}
