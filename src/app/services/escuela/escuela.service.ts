import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Escuela } from 'src/app/models/escuela.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class EscuelaService {

  totalEscuelas: number = 0;

  constructor(
    public http: HttpClient,     // 1) para poder realizar peticiones
    public usuarioService: UsuarioService   // inyecto para traer token del usuario
    ) { }


  cargarEscuelas(desde: number = 0) {  // recibe del componente el desde

    let url = URL_SERVICIOS + '/escuela?desde=' + desde;
    return this.http.get( url ); // realziamos peticion para obtener todas las escuelas mandamos el url

               }

  // CARGA INICIAL EN LISTADOS
  cargarEscuelasList(desde: number = 0) {  // recibe del componente el desde

  let url = URL_SERVICIOS + '/escuela/list?desde=' + desde;
  return this.http.get( url ); // realziamos peticion para obtener todas las escuelas mandamos el url

              }

 // fx para obtener Escuela por DPTO por parametro
 obtenerEscuelaList( dpto: string ) {   // utilizada además para obtener cargar datos de escuela al editar la misma

  let url = URL_SERVICIOS + '/escuela/listado' + dpto;
  return this.http.get( url )
              .map( (resp: any) => resp.escuela);  // resp.escuela es la rta de postman

}

  cargarEscuelasCbo() {

    let url = URL_SERVICIOS + '/escuela/cbo';
    return this.http.get( url ) // realizamos peticion para obtener todas las escuelas mandamos el url
                .map (( resp: any) => {
                return resp.escuelas;

                });
      }


  obtenerEscuela( id: string ) {   // utilizada además para obtener cargar datos de escuela al editar la misma

    let url = URL_SERVICIOS + '/escuela/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.escuela);  // resp.escuela es la rta de postman

  }


  borrarEscuela( id: string ) {

    let url = URL_SERVICIOS + '/escuela/' + id;
    url += '?token=' + this.usuarioService.token;  // traigo el token del usuario

    return this.http.delete( url )
                .map( (resp: any) => {
                  Swal.fire ({
                    icon: 'success', title: 'Escuela Borrada! ',
                    text: resp.nombre
                  });
                  return true;
                });

  }

  crearEscuela1( nombre: string ) {

    let url = URL_SERVICIOS + '/escuela';
    url += '?token=' + this.usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.escuela );

  }
 // del servicio se vincula con el backend
   crearEscuela( escuela: Escuela ) {   // recibe una escuela de tipo escuela

    let url = URL_SERVICIOS + '/escuela';  // URL al cual realizo la petición

    if (escuela._id) {
      url += '/' + escuela._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put (url, escuela)
                      .map( (resp: any) => {
                        Swal.fire ({
                          icon: 'success', title: 'Escuela actualizada! ',
                          text: resp.escuela.nombre
                        });
                        return resp.escuela;
                      });
    } else {
            url += '?token=' + this.usuarioService.token;         // Envío token
            return this.http.post( url, escuela )     // envío el URL que necesito llamar y la escuela que quiero crear
                  .map( (resp: any) => {          // con el resp voy a recibir una escuela actualizada
                    Swal.fire ({
                      icon: 'success', title: 'Escuela creada! ',
                      text: resp.escuela.nombre
                    });
                    return resp.escuela;          // retorno de la respuesta la escuela
                });
            }


}




 buscarEscuela( termino: string ) {

  let url = URL_SERVICIOS + '/busqueda/coleccion/escuelas/' + termino;
  return this.http.get( url )
              .map( (resp: any) => resp.escuelas );

}

actualizarEscuela( escuela: Escuela ) {

  let url = URL_SERVICIOS + '/escuela/' + escuela._id;
  url += '?token=' + this.usuarioService.token;

  return this.http.put( url, escuela )
                  .map ( (resp: any) => {
                    Swal.fire ({
                      icon: 'success', title: 'Escuela actualizada! ',
                      text: escuela.nombre,
                    });
                    return resp.escuela;
  });

  }

}
