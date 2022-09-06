import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { crearCineDTO } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.scss']
})
export class FormularioCineComponent implements OnInit {

  @Input() modelo: crearCineDTO | undefined;
  @Input() errores: string[]= [];
  @Output() save: EventEmitter<crearCineDTO> = new EventEmitter<crearCineDTO>();

  form!: FormGroup;
  initLatLong: Coordenada[] = [];

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', {
        validators: [Validators.required]
      }],
      latitud:['',{
        validators: [Validators.required]
      }],
      longitud:['',{
        validators: [Validators.required]
      }]
    });

    if(!!this.modelo){
      this.form.patchValue(this.modelo);
      this.initLatLong.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud})
    }
  }

  onSubmit():void{
    this.save.emit(this.form.value);
  }

  locationSelected(coordenada: Coordenada):void{
    this.form.patchValue(coordenada)
  }

}
