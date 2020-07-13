import { Component, OnInit } from '@angular/core';
import { EscuelaService } from 'src/app/services/service.index';
import { Escuela } from 'src/app/models/escuela.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { Director } from 'src/app/models/director.model';
import { DirectorService } from 'src/app/services/director/director.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styles: []
})
export class ListadosComponent implements OnInit {

  escuelas: Escuela [] = []; // 2 arreglo de escuelas
  directores: Director[] = [];
  director: Director = new Director('');
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  p: number = 1;
  fileName = 'ExcelEscuelas.xlsx';
  constructor(
    // tslint:disable-next-line: variable-name
    public _escuelaService: EscuelaService,   // 1 inyecto el servicio que consumiré en cargarEscuelas
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService,   // 1
    // tslint:disable-next-line: variable-name
    public _directorService: DirectorService,
  ) { }

  ngOnInit() {
    this.cargarEscuelas();  // 4
    this._modalUploadService.notificacion
        .subscribe( () => this.cargarEscuelas() );
    this._directorService.cargarDirectoresCbo()
        .subscribe(directores => this.directores = directores);
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Escuelas');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

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

cambioDirector( id: string ) {

  this._directorService.cargarDirector( id )
  .subscribe( director => this.director = director );

    }


}


