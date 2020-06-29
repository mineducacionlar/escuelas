
import { Component, OnInit, Inject, ElementRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index'; // Módulo único de servicios


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // 5) inyecto importando una propiedad llamada DOCUMENT (se pasa al punto 10) y creo prop.privada _DOCUMENT
  // Con el objeto _DOCUMENT ya tenemos acceso a todo el DOM
  constructor( public _AJUSTES: SettingsService // importamos nuestro servicio creando una vble del mismo tipo
                                                // para poder tener disponible todos las prop. y metodos.
  ) { }



  ngOnInit() {

    this.colocarCheck(); // c/la página sea cargada se va a disparar esta fx
  }
//  3 fx para cambiar de tema que es recibido del HTML
    cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);

    // 10
    this._AJUSTES.aplicarTema(tema);
  }

  // ** tome el atributo con id tema del index.html y lo que quiero cambiar es el href,y le paso la URL

  // fx dedicada a cambiar el check
    aplicarCheck(link: any) {

      // creo un arreglo de selectores toma el class selector del html
      let selectores: any = document.getElementsByClassName('selector');

      for (let ref of selectores) {
        ref.classList.remove ('working');  // remueve cualquier classe que diga working
      }

      link.classList.add ('working'); // al link seleccionado le agrega la clase working, el CHEK !!!!

    }

    colocarCheck() {
      let selectores: any = document.getElementsByClassName('selector'); // obtengo todos los elementos del html account-settings

      let tema1 = this._AJUSTES.ajustes.tema;   // traigo del servicio el tema

      for (let ref of selectores) {  // ref vble que invento para recorrer selectores
        ref.classList.remove ('working');
        if (ref.getAttribute('data-theme') === tema1) {  // getAttribute puedo preguntar por cualquier atributo del html ej:data-theme
        ref.classList.add ('working'); // le agrega la clase working, el CHEK !!!!
        break; // salgo del ciclo for
       }
      }
    }
}
