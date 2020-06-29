import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';  // Módulo único de servicios


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// 7) aca se carga todo desde el principio
export class AppComponent {
  // inyecto el servicio
  constructor(public _AJUSTES: SettingsService) {

  }
}
