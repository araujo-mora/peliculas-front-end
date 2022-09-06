import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mostrar-errores',
  templateUrl: './mostrar-errores.component.html',
  styleUrls: ['./mostrar-errores.component.scss']
})
export class MostrarErroresComponent implements OnInit, OnChanges {

  @Input() errores: string[] = [];

  constructor(private toastr: ToastrService) {}
  
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showError();
  }

  showError() {
    this.errores.forEach((errno => {
      this.toastr.error(errno);
    }));
  }

}
