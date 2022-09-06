import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.scss']
})
export class ListadoGenericoComponent implements OnInit {

  @Input() listado :any;
  @Input() message: string = "No hay películas para mostrar";

  constructor() { }

  ngOnInit(): void {
  }

}
