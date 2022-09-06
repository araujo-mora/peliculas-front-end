import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorDTO, crearActorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actor',
  templateUrl: './formulario-actor.component.html',
  styleUrls: ['./formulario-actor.component.scss']
})
export class FormularioActorComponent implements OnInit {

  @Input() modelo: actorDTO | undefined;
  @Input() errores: string[] = [];
  @Output() save: EventEmitter<crearActorDTO> = new EventEmitter<crearActorDTO>();
  
  form!: FormGroup;
  imageChanges: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      { 
        nombre: ['', { validators: [ Validators.required ] }],
        fechaNacimiento: '',
        foto: '',
        biografia: ''
      }
    );

    if(!!this.modelo){
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit(): void{
    if(!this.imageChanges){
      this.form.patchValue({'foto': null});
    }
    this.save.emit(this.form.value);
  }

  fileChanges(file: File): void{
    this.imageChanges = true;
    this.form.get('foto')?.setValue(file);
  }

  markdownChanges(text: string): void{
    this.form.get('biografia')?.setValue(text);
  }

}
