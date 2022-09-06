import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './multiple-selector-model';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.scss']
})
export class MultipleSelectorComponent implements OnInit {

  @Input() selected: MultipleSelectorModel[] = [];
  @Input() notSelected: MultipleSelectorModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectAll(): void{
    this.selected?.push(...this.notSelected);
    this.notSelected = [];
  }

  unselectAll(): void{
    this.notSelected.push(...this.selected);
    this.selected = [];
  }

  select(item: MultipleSelectorModel, i: number): void{
    this.selected?.push(item);
    this.notSelected?.splice(i,1)
  }

  unselect(item: MultipleSelectorModel, i: number): void{
    this.notSelected?.push(item);
    this.selected?.splice(i,1)
  }
}
