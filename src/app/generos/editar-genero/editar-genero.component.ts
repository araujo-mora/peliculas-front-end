import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { crearGeneroDTO, generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.scss']
})
export class EditarGeneroComponent implements OnInit {

  modelo: generoDTO | undefined;
  errores: string[] = [];

  constructor(
    private router: Router, 
    private generosService: GenerosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.generosService.getById(params['id']).subscribe({
        next: (genero: generoDTO) =>{ 
          this.modelo = genero;
        },
        error: err => { this.errores = parseHttpError(err) },
        complete: () => {console.info('Successful'); }
      });
    });
  }

  saveChanges(genero: crearGeneroDTO): void{
    this.generosService.update(this.modelo?.id, genero).subscribe({
      next: () =>{ this.router.navigate(['/generos']); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }
  
}
