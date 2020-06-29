import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import Swal from 'sweetalert2';

declare function init_plugins(); // 3)
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;


  constructor( public router: Router,
               // tslint:disable-next-line: variable-name
               public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
   // 2)
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '959578684210-6plrlln9kd866p0hpb8tce680fruflqs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin ( document.getElementById ('btnGoogle') );

    });

  }

  attachSingin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();   p/obtener otros datos del profile

      let token = googleUser.getAuthResponse().id_token;
      // console.log (token);

      this._usuarioService.loginGoogle ( token )
                          .subscribe ( () => window.location.href = 'dashboard' );

                          });

  }

  // 1)
    ingresar( forma: NgForm ) {

      if ( forma.invalid ) {
        return;
      }

      let usuario = new Usuario (null, forma.value.email, forma.value.password);

      this._usuarioService.login( usuario, forma.controls.recuerdame.value)
                          .subscribe (

                            ok => {

                            this.router.navigate(['/dashboard']);

                            },
                            (err: any) => {

                              // console.log(err);
                              Swal.fire ('Credenciales incorrectas!', 'Vuelva a intentar');

                            });

                          }
                        }


//   .subscribe( correcto => this.router.navigate(['/dashboard'])  );
// .subscribe( correcto => this.router.navigate(['dashboard']) );
 /* 1) fx ingresar para el acceso del login al dashboard llamada desde el html
    2) Fx que sirve para llamar desde afuera de angular a custom.js para solucionar
       el menú que no despliega después del logueo
    3) Necesario para que reconozca la fx init_plugins(); y se debe agregar en la página que envuelve
    a todas las páginas que es page.component.ts, si no esta provoca que el loading no pare nunca*/

