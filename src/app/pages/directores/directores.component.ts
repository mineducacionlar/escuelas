import { Component, OnInit } from '@angular/core';
import { DirectorService } from 'src/app/services/director/director.service';
import { Director } from 'src/app/models/director.model';
import { EscuelaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directores',
  templateUrl: './directores.component.html',
  styles: []
})
export class DirectoresComponent implements OnInit {

  directores: Director[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    // tslint:disable-next-line: variable-name
    public _directorService: DirectorService,
    // tslint:disable-next-line: variable-name
    public _escuelaService: EscuelaService
  ) { }

  ngOnInit() {
    this.cargarDirectores();
  }

  cargarDirectores() {

    this.cargando = true;

    this._directorService.cargarDirectores (this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.directores = resp.directores;
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
    this.cargarDirectores();

  }

    buscarDirector( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarDirectores();
      return;
    }

    this._directorService.buscarDirector( termino )
            .subscribe( directores =>  this.directores = directores );
  }

  borrarDirector( director: Director ) {

      Swal.fire({
        title: 'Esta seguro?',
        text: 'Esta a punto de borrar a:  ' + director.nombre,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar!'
    })
    .then( borrar => {
      if (borrar.value) {
       this._directorService.borrarDirector( director._id )
            .subscribe( () =>  this.cargarDirectores() );

          }

        });

      }

}