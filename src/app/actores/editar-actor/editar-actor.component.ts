import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { actorDTO, crearActorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.scss']
})
export class EditarActorComponent implements OnInit {

  modelo: actorDTO | undefined;
  errores: string[] = [];

  constructor(
    private router: Router, 
    private actoresService: ActoresService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.actoresService.getById(params['id']).subscribe({
        next: (actor: actorDTO) =>{ 
          this.modelo = actor;
        },
        error: err => { this.errores = parseHttpError(err) },
        complete: () => {console.info('Successful'); }
      });
    });
  }

  saveChanges(actor: crearActorDTO): void{
    this.actoresService.update(this.modelo?.id, actor).subscribe({
      next: () =>{ this.router.navigate(['/actores']); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
    
  }
}
