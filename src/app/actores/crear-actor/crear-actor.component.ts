import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseHttpError } from 'src/app/utilidades/utilidades';
import { crearActorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.scss']
})
export class CrearActorComponent implements OnInit {

  errores: string[] = [];

  constructor(
    private actoresService: ActoresService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  saveChanges(actor: crearActorDTO): void{
    this.actoresService.add(actor).subscribe({
      next: () => { this.router.navigate(['/actores']); },
      error: err => { this.errores = parseHttpError(err) },
      complete: () => {console.info('Successful'); }
    });
  }

}
