import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { capitalLetter } from 'src/app/utilidades/Validators/CapitalLetter';
import { crearGeneroDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.scss']
})
export class FormularioGeneroComponent implements OnInit {

  @Output() save: EventEmitter<crearGeneroDTO> = new EventEmitter<crearGeneroDTO>();
  @Input() modelo:crearGeneroDTO | undefined;
  @Input() errores: string[]= [];
  
  form!: FormGroup;

  constructor( 
    private fb: FormBuilder 
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', {validators: [Validators.required, Validators.minLength(3), capitalLetter()]}]
    });
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit(){
    this.save.emit(this.form.value);
  }

  getErrNameField():string{
    var field = this.form.get('nombre');
    if(field?.hasError('required')){
      return 'El campo es requerido';
    }
    if(field?.hasError('minlength')){
      return 'La longitud mínima es de 3 caracteres';
    }

    if(field?.hasError('capitalLetter')){
      return field.getError('capitalLetter').message;
    }
    return '';
  }

}
