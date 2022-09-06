import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilidades/multiple-selector/multiple-selector-model';
import { crearPeliculaDTO, peliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.scss']
})
export class FormularioPeliculaComponent implements OnInit {

  @Input() modelo: peliculaDTO | undefined;
  @Output() save: EventEmitter<crearPeliculaDTO> = new EventEmitter<crearPeliculaDTO>();

  form!: FormGroup;
  selectedGenders: MultipleSelectorModel[] = [];
  notSelectedGenders: MultipleSelectorModel[] = [
    {key: 1, value: 'Drama'},
    {key: 2, value: 'Acción'},
    {key: 3, value: 'Comedia'}
  ];
  selectedCinemas: MultipleSelectorModel[] = [];
  notSelectedCinemas: MultipleSelectorModel[] = [
    {key: 1, value: 'Galerias Toluca'},
    {key: 2, value: 'Galerias Metepec'},
    {key: 3, value: 'Plazas outlet'}
  ];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['',{
        validators: [Validators.required]
      }],
      resumen:'',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      gendersId:'',
      cinesId:''
    });

    if(!!this.modelo){
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit(){
    const gId = this.selectedGenders.map(obj => obj.key);
    this.form.get('gendersId')?.setValue(gId);
    const cId = this.selectedCinemas.map(obj => obj.key);
    this.form.get('cinesId')?.setValue(cId);
    this.save.emit(this.form.value);
  }

  fileChanges(file: File): void{
    this.form.get('poster')?.setValue(file);
  }

  markdownChanges(text: string): void{
    this.form.get('resumen')?.setValue(text);
  }
}


// https://developers.google.com/docs/api/quickstart/java
// https://developers.google.com/docs/api/quickstart/java
// https://www.sensacine.com/actores/actor-93267/
// https://www.covercaratulas.com/caratula-carteles-Han_Solo_Una_Historia_De_Star_Wars-28931.html
// https://github.com/gavilanch/Angular-y-ASP.NET-Core/blob/main/Angular%2012%20-%20.NET%205/Modulo%204%20-%20Formularios/fin/front-end/src/app/utilidades/mapa/mapa.component.ts