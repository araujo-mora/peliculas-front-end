import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.scss']
})
export class InputImgComponent implements OnInit {

  @Input() currentImgURL: string | undefined;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  imgBase64: string|ArrayBuffer|null = "";

  constructor() { }

  ngOnInit(): void {
  }

  change(event: Event | null):void{
    var el = event?.target as HTMLInputElement
    if(!!el.files?.length && el.files?.length > 0){
      const file: File = el.files[0];
      toBase64(file).then((value: string|ArrayBuffer|null)=> this.imgBase64 = value)
      .catch(err => console.log(err));
      this.fileSelected.emit(file);
      this.currentImgURL = undefined;
    }
  }

}

