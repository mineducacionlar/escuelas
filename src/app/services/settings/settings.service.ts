import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


// Ajuste de tema: servicio que contiene-->Metodos {propiedad ajuste de tipo interface,guardarAjustes, cargarAjustes, Interface}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    // 2) creo propiedad ajuste que va a ser de tipo ajustes y que va a ser un objeto
  ajustes: Ajustes = {
    temaurl: 'assets/css/colors/default.css',  // propiedades por defecto que voy a tener
    tema: 'default'
  };


  constructor( @Inject(DOCUMENT) private _DOCUMENT ) {
// 8 para que automaticamente al cargar la app (paso 7) me dispare el metodo
    this.cargarAjustes();
  }
// 3)
  guardarAjustes() {

    // Almacena en el local Storage - ajustes es el objeto creado
    // console.log ('Guardando en el localStorage');
    localStorage.setItem ('ajustes', JSON.stringify (this.ajustes) ); // transforma el objeto a JSON
    }

// 4) proceso inverso que es para cargar los ajustes
 cargarAjustes() {

  if ( localStorage.getItem ('ajustes')) {    // valido si existen los ajustes

    this.ajustes = JSON.parse (localStorage.getItem('ajustes')) ; // si existen los cargo y seteo en esta vble ajustes
    // console.log ('Cargando del local Storage');
    this.aplicarTema(this.ajustes.tema);
  } else {
    console.log ('Usando valores por defecto');
    // 11 sacamos el href del index. Html y aplicamos el tema al cargar
    this.aplicarTema (this.ajustes.tema);
  }
}

 // 9 para aplicar el tema guardado del localStorage

 aplicarTema(tema: string) {
  // console.log (link);
    const url = `assets/css/colors/${ tema }.css`; // template literal, enviamos el tema
    this._DOCUMENT.getElementById('tema').setAttribute ('href', url); // **

    // 6 para empezar a cambiar los valores del tema
    this.ajustes.tema = tema;    // se llama al servicio y luego a la propiedad compuesta y
    this.ajustes.temaurl = url;  // enviamos el tema seleccionado y url seleccionado. (aca no hace falta llamar al servicio)

    this.guardarAjustes();
  }


}

// 1) permite restringirme a mi mismo que tipo de info va a permitirse en los ajustes y TS facilita las ayudas
interface Ajustes {
  temaurl: string;
  tema: string;

}
