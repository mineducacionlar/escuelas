import { Component, OnInit, Input} from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';


// **** Componente Especialiado (Hijo) ***

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // 1) recibo del padre las vbles utilizadas en el HTML  ajusto tipo de vbles

 @Input('ChartLabels') public doughnutChartLabels: string[] = [];
 @Input('ChartData') public doughnutChartData: number [] = [];
 @Input('ChartType') public doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
