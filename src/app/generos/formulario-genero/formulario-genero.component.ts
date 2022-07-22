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

  @Output() submit: EventEmitter<crearGeneroDTO> = new EventEmitter<crearGeneroDTO>();
  @Input() modelo:crearGeneroDTO | undefined;
  form!: FormGroup;

  constructor( 
    private fb: FormBuilder 
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', {validators: [Validators.required, Validators.minLength(3), capitalLetter()]}]
    });
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  saveForm(){
    this.submit.emit(this.form.value);
  }

  getErrNameField():string{
    var field = this.form.get('name');
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
