import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('#txtProgress', { static: false}) txtProgress: ElementRef;

  // 1)
  @Input('nombre')  leyenda: string = 'Leyenda';
  @Input()  progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter ();


  constructor() {

/*  console.log ('progreso', this.progreso);
    console.log ('leyenda', this.leyenda); */
   }

  ngOnInit() {
    console.log (this.progreso);
  }
onChanges( newValue: number) {
const ElemHTML: any  = document.getElementsByName('progreso')[0];


if (newValue >= 100) {
  this.progreso = 100;
} else if (newValue <= 0) {
  this.progreso = 0;
} else {
  this.progreso = newValue;
}
ElemHTML.value = this.progreso;
this.cambioValor.emit (this.progreso);
}


  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0) {
       this.progreso = 100;
       return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
  }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit (this.progreso);
    this.txtProgress.nativeElement.value = this.progreso;
    this.txtProgress.nativeElement.focus();

}
// 1 significa que estas dos variables tammbien pueden venir de afuera del componente
// si tiene el decorador  @input este componente es Hijo

}
