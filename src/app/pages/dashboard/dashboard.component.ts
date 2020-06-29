import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }  // inyectamos el servicio

  ngOnInit() {

  }

}

 /* .subscribe() es un método del tipo Observable, es una utilidad que transmite datos de forma asíncrona
o sincrónica a una variedad de componentes o servicios que se han suscrito al observable

Un observable en sí mismo puede considerarse como un flujo de datos proveniente de una fuente,
en Angular esta fuente es un punto final API, un servicio, una base de datos u otro observable.
Pero el poder que tiene es que no espera una sola respuesta. Puede tener uno o muchos valores que
se devuelven.*/
