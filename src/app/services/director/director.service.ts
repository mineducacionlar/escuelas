import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Director } from 'src/app/models/director.model';
import { UsuarioService } from '../usuario/usuario.service';
import { EscuelaService } from '../service.index';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  totalDirectores: number = 0;


  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    // tslint:disable-next-line: variable-name
    public _escuelaService: EscuelaService         // CARGO SERVICIOS DE ESCUELAS
  ) { }


    cargarDirectores(desde: number = 0) {  // recibe del componente el desde

      let url = URL_SERVICIOS + '/director?desde=' + desde;
      return this.http.get( url ); // realizamos peticion para obtener todas las escuelas mandamos el url

                 }

    cargarDirectoresCbo() {

    let url = URL_SERVICIOS + '/director/cbo';
    return this.http.get( url )
              .map( (resp: any) => {
              return resp.directores;
              });
          }

  cargarDirector( id: string ) {

    let url = URL_SERVICIOS + '/director/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.director );

  }

  buscarDirector( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/directores/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.directores );

  }

  borrarDirector( id: string ) {

    let url = URL_SERVICIOS + '/director/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                Swal.fire ({
                  icon: 'success',
                  title: 'Director Borrado',
                  text: 'Director borrado correctamente'
                });
                return resp;
              });

  }



  guardarDirector( director: Director ) {

    let url = URL_SERVICIOS + '/director';

    if ( director._id ) {
      // actualizando
      url += '/' + director._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, director )
                .map( (resp: any) => {
                  Swal.fire ({
                    icon: 'success',
                    title: 'Director Actualizado correctamente!',
                    text: director.nombre
                  });
                  return resp.director;
                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, director )
              .map( (resp: any) => {
                Swal.fire ({
                  icon: 'success',
                  title: 'Director Creado correctamente!',
                  text: director.nombre
                });
                return resp.director;
              });
    }




  }

}
