import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { HttpClient  } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any [] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem ('token')) {      // si existe el token disparo la fx
      this.token = localStorage.getItem ('token');
      this.usuario = JSON.parse (localStorage.getItem ('usuario'));
      this.menu = JSON.parse (localStorage.getItem ('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = []; // destruyo el menú si no tengo el token
    }
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevaToken';
    url += '?token=' + this.token;

    return this.http.get( url ).pipe(   // agregar pipe y map   ******************!!!!!
                     map ((resp: any) => {

                      this.token = resp.token;
                      localStorage.setItem('token', this.token );

                      return true;  // devuelve true para quien se subscriba (llame) a la fx
                    }),
                    catchError(err => {
                      this.router.navigate(['/login']);
                      Swal.fire ({
                        icon: 'error',
                        title: 'No se pudo renovar token',
                        text:  'No fue posible renovar token',
                      });
                      return throwError(err);
                    })
                );
          }

  estaLogueado() {
    return ( this.token.length > 5) ? true : false;  // si el toquen existe entonces ? le envio un true si no un false
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

        localStorage.setItem('id', id);
        localStorage.setItem('token', token );
        localStorage.setItem('usuario', JSON.stringify (usuario ));
        localStorage.setItem('menu', JSON.stringify (menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;


      }


logout() {

  this.usuario = null;
  this.token = '';

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('menu');

  this.router.navigate(['/login']);


}

loginGoogle( token: string) {

  let url = URL_SERVICIOS + '/login/google';

  return this.http.post (url, { token } )
                  .map ( (resp: any )  => {
                   this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

                   return true;
                  });

}

login(usuario: Usuario, recordar: boolean = false) {
  if (recordar) {
      localStorage.setItem('email', usuario.email );
  } else {
    localStorage.removeItem('email');
  }
  let url = URL_SERVICIOS + '/login';
  return this.http.post(url, usuario).pipe(

    map((resp: any) => {

      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

      return true;

    }),

    catchError(err => {

      console.log(err.status);

      return throwError(err.message);

    })

  );

}

 crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post ( url, usuario )
              .map ( ( resp: any)  => {
                Swal.fire ({
                icon: 'success',
                titleText: 'Usuario creado exitosamente!',
                text: usuario.nombre,
                   });
                return  resp.usuario;
              }).pipe(
                map ( resp => ['usuario'] ),
                  catchError ( err => {
                    return throwError( 'error personalizado');

                  })

              );

            }


actualizarUsuario( usuario: Usuario ) {

  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url += '?token=' + this.token;

  return this.http.put( url, usuario )
              .map( (resp: any) => {

                if ( usuario._id === this.usuario._id ) {
                  let usuarioDB: Usuario = resp.usuario;
                  this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
                }

                Swal.fire ({
                  icon: 'success',
                  titleText: 'Usuario Actualizado!',
                  text: usuario.nombre,
                     });

                return true;
              }).pipe(
                map ( resp => ['usuario'] ),
                  catchError ( err => {
                    Swal.fire ('Cuenta de email existente! - El nombre del usuario no puede estar vacío', 'Atención!!');
                    return throwError( 'error');

                  })

              );

}

cambiarImagen( archivo: File, id: string ) {

  this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {

          this.usuario.img = resp.usuario.img;
          Swal.fire ({
            icon: 'success',
            titleText: 'Imagen actualizada!',
               });

          this.guardarStorage( id, this.token, this.usuario, this.menu);

        })
        .catch( resp => {
          console.log( resp );
        }) ;

}

cargarUsuarios( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/usuario?desde=' + desde;
  return this.http.get( url );

}

buscarUsuarios( termino: string ) {

  let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  return this.http.get( url )
              .map( (resp: any) => resp.usuarios );

}

borrarUsuario( id: string ) {

  let url = URL_SERVICIOS + '/usuario/' + id;
  url += '?token=' + this.token;

  return this.http.delete( url )
              .map( resp => {
                Swal.fire ({
                  icon: 'success', title: 'Usuario Borrado! ',
                  text: 'Usuario borrado'
                });
                return true;
              });

}

}


/*
swal ('usuario creado ! ', usuario.email, 'success' );
}); */
