import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

// componente Padre (tiene graficos y data )

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {


// public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
// public doughnutChartData: MultiDataSet = [
//   [350, 450, 100],
//   [50, 150, 120],
//   [250, 130, 70],
// ];
// public doughnutChartType: ChartType = 'doughnut';


  // valores nuevos para el gráfico
  graficos: any = {
    'grafico1': {
      'labels': ['1-A', '1-B', '1-C', '1-D', '1-E', '1-F', 'Zona IV'],
      'data':  [15, 12, 13, 13, 15, 15, 33],
      'type': 'doughnut',
      'leyenda': 'Escuelas por Zona'
    },
    'grafico2': {
      'labels': ['Completas', 'Por cargar'],
      'data':  [180, 15],
      'type': 'doughnut',
      'leyenda': 'Escuelas cargadas al sistema'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Encuesta: Esta conforme con los servicios online ?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [30, 70],
      'type': 'doughnut',
      'leyenda': 'Escuelas sin clases ?'
    },
  };


  constructor() { }

  ngOnInit() {
  }

}
