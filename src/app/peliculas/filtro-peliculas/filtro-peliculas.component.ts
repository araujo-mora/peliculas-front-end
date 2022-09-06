import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.scss']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private ar: ActivatedRoute
  ) { }

  form!: FormGroup;
  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Comedia' },
    { id: 3, nombre: 'Acción' }
  ];

  peliculas = [
    { titulo: 'Spider-Man: Far from Home', enCines: false, proximosEstrenos: true, generos: [1,2], poster: 'assets/img/Spider-Man.jpg' },
    { titulo: 'Moana', enCines: true, proximosEstrenos: false, generos: [3], poster: 'assets/img/Moana.jpg' },
    { titulo: 'Han Solo', enCines: false, proximosEstrenos: false, generos: [1], poster: 'assets/img/Han-Solo.jpg' }
  ];

  peliculasBackup = this.peliculas;
  initForm = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit(): void {
    this.form = this.fb.group(this.initForm);
    this.readURL();
    this.searchMovies(this.form.value);
    this.form.valueChanges.subscribe((values)=>{
      this.peliculas = this.peliculasBackup;
      this.searchMovies(values);
      this.writeURL();
    });
  }

  searchMovies(values: any):void{
    if(values.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(values.titulo) !== -1);
    }
    if(values.generoId !== 0 ){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(values.generoId) !== -1);
    }
    if(values.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }
    if(values.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  private writeURL(): void{
    var queryStrings = [];
    var formValues = this.form.value;
    if(formValues.titulo){
      queryStrings.push(`titulo=${formValues.titulo}`)
    }
    if(formValues.generoId !== 0){
      queryStrings.push(`generoId=${formValues.generoId}`)
    }
    if(formValues.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${formValues.proximosEstrenos}`)
    }
    if(formValues.enCines){
      queryStrings.push(`titulo=${formValues.enCines}`)
    }
    this.loc.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  readURL(): void{
    this.ar.queryParams.subscribe((params)=>{
      var obj: any = {};
      if(params['titulo']){
        obj.titulo = params['titulo'];
      }
      if(params['generoId']){
        obj.generoId = Number(params['generoId']);
      }
      if(params['proximosEstrenos']){
        obj.proximosEstrenos = params['proximosEstrenos'];
      }
      if(params['enCines']){
        obj.enCines = params['enCines'];
      }
      this.form.patchValue(obj);
    });
  }

  clean(): void{
    this.form.patchValue(this.initForm);
  }

}
