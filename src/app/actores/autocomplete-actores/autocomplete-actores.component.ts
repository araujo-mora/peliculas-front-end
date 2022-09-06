import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.scss']
})
export class AutocompleteActoresComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  control: FormControl = new FormControl;
  actores = [
    {nombre: 'Tom Holland', personaje: '', foto: 'assets/actores/Tom Holland.jpg'},
    {nombre: 'Zendaya', personaje: '', foto: 'assets/actores/Zendaya.jpg'},
    {nombre: 'Robert Downey Jr', personaje: '', foto: 'assets/actores/Robert Downey Jr.jpg'},
  ];
  actoresOriginal = this.actores;
  actoresSelected: any[] = [];
  columnsToShow = ['imagen', 'nombre', 'personaje', 'acciones'];

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(val =>{
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(val) !== -1);
    });
  }

  optSelected(event: MatAutocompleteSelectedEvent):void{
    this.actoresSelected.push(event.option.value);
    this.control.patchValue('');
    this.table?.renderRows();

  }

  deleteFromTable(actor: any):void{
    const index = this.actoresSelected.findIndex(a => a.nombre == actor.nombre);
    this.actoresSelected.splice(index,1);
    this.table?.renderRows();
  }

  onDropFinish(event: CdkDragDrop<any[]>): void{
    const previousIndex = this.actoresSelected.findIndex(
      a => a === event.item.data
    );
    moveItemInArray(this.actoresSelected,previousIndex, event.currentIndex);
    this.table?.renderRows();
  }
}
