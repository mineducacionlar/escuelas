import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto'; // en html del modal coloco:[ngClass]="modalUploadService.oculto"> prop. oculto hace queno aparezca

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
