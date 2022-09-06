import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { cineDTO, crearCineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.scss']
})
export class EditarCineComponent implements OnInit {

  modelo: cineDTO | undefined;
  errores: string[] = [];

  constructor(
    private router: Router, 
    private cinesService: CinesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.cinesService.getById(params['id']).subscribe({
        next: (cine: cineDTO) =>{ 
          this.modelo = cine;
        },
        error: err => { this.errores = parseHttpError(err) },
        complete: () => {console.info('Successful'); }
      });
    });
  }

  saveChanges(cine: crearCineDTO): void{
    this.cinesService.update(this.modelo?.id, cine).subscribe({
      next: () =>{ this.router.navigate(['/cines']); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }
  
}
