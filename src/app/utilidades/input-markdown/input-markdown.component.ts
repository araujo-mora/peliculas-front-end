import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.scss']
})
export class InputMarkdownComponent implements OnInit {

  @Input() placeholder: string = 'Texto';
  @Input() markDownContent: string | undefined = '';
  @Output() textAreaChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onTextAreaChange(event: Event): void{
    var el = event.target as HTMLInputElement;
    this.textAreaChange.emit(el.value);
  }

}
