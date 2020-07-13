import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Escuela } from 'src/app/models/escuela.model';
import { Director } from 'src/app/models/director.model';
import { DirectorService } from 'src/app/services/director/director.service';
import { EscuelaService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styles: []
})
export class DirectorComponent implements OnInit {

    escuelas: Escuela[] = [];  // 1) Para cargar combo de escuelas, creo arreglo
    director: Director = new Director('', '', '', '', '' , '', '', '');
    escuela: Escuela = new Escuela('');


  constructor(
    // tslint:disable-next-line: variable-name
    public _directorService: DirectorService,
    // tslint:disable-next-line: variable-name
    public _escuelaService: EscuelaService,  // 2 inyecto el metodo desde el servicio p/ser llamado en el ngOnInit
    public router: Router,
    public activatedRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      // tslint:disable-next-line: no-string-literal
      let id = params[ 'id' ];

      if ( id !== 'nuevo' ) {
        this.cargarDirector( id );
      }

    });
  }

  ngOnInit() {

    this._escuelaService.cargarEscuelasCbo()  // 3 para cargar comboEscuelas (de escuela.service)
          .subscribe (escuelas => this.escuelas = escuelas); // voy a recibir las escuelas y this.escuelas = escuelas que recibo del servicio

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.director.img = resp.director.img;
          });

  }

  cargarDirector( id: string ) {   // recibe el id del director que quiero buscar
    this._directorService.cargarDirector( id )
          .subscribe( director => {

         // console.log( director );
            this.director = director;
            this.director.escuela = director.escuela._id;
            this.cambioEscuela ( this.director.escuela );
          });
  }

  guardarDirector( f: NgForm ) {

 //   console.log( f.valid );
  //  console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._directorService.guardarDirector( this.director )
            .subscribe( director => {

         //    console.log ( director);  // necesito el ID para poder actualizar el dato

              this.director._id = director._id;

              this.router.navigate(['/director', director._id ]);

            });

  }

  cambioEscuela( id: string ) {

    this._escuelaService.obtenerEscuela( id )
          .subscribe( escuela => this.escuela = escuela );

  }



  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'directores', this.director._id );

  }


}

