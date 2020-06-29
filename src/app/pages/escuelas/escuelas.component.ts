import { Component, OnInit } from '@angular/core';
import { EscuelaService } from 'src/app/services/service.index';
import { Escuela } from 'src/app/models/escuela.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styles: []

})
export class EscuelasComponent implements OnInit {

  escuelas: Escuela [] = []; // 2 arreglo de escuelas
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(

    // tslint:disable-next-line: variable-name
    public _escuelaService: EscuelaService,   // 1 inyecto el servicio que consumiré en cargarEscuelas
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService    // 1
  ) { }

  ngOnInit() {
    this.cargarEscuelas();  // 4
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarEscuelas() );
  }

  // necesito llamar al servicio de las escuelas para poder cargar la info que debería regresarme el servicio


  cargarEscuelas() {

    this.cargando = true;

    this._escuelaService.cargarEscuelas (this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.escuelas = resp.escuelas;
                this.cargando = false;

              });

  }

  cargarEscuelasCbo() {

    this.cargando = true;

    this._escuelaService.cargarEscuelas (this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.escuelas = resp.escuelas;
                this.cargando = false;

              });

  }


  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarEscuelas();

  }


  buscarEscuela( termino: string) {

    if (termino.length <= 0 ) {
      this.cargarEscuelas();
      return;
    }

    this._escuelaService.buscarEscuela( termino )
        .subscribe( escuelas => this.escuelas = escuelas);
  }

  guardarEscuela( escuela: Escuela) {

    this._escuelaService.actualizarEscuela( escuela )
            .subscribe();

  }

  borrarEscuela( escuela: Escuela ) {

   Swal.fire({
        title: 'Esta seguro?',
        text: 'Esta a punto de borrar a:  ' + escuela.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!'
    })
    .then( borrar => {

      if (borrar.value) {

         this._escuelaService.borrarEscuela( escuela._id )
         .subscribe( () =>  this.cargarEscuelas() );
            }
          });

  }



actualizarImagen( escuela: Escuela ) {

        this._modalUploadService.mostrarModal( 'escuelas', escuela._id );

          }

}


