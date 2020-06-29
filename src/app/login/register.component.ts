import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.models';
import { Router } from '@angular/router';


declare function init_plugins();  // 1) necesario para que el loading termine de cargar

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;  // 2)

  constructor(
      // tslint:disable-next-line: variable-name
      public _usuarioService: UsuarioService,
      public router: Router
        ) { }

sonIguales( campo1: string, campo2: string) {   // va a recibir 2 campos que necesito a evaluar de tipo string
  return ( group: FormGroup) => {

  let pass1 = group.controls[campo1].value;      // si pasa la validación regresa un null
  let pass2 = group.controls[campo2].value;

  if ( pass1 === pass2 ) {
    return null;
  }
  return {
  sonIguales: true       // 5) si es true es por que detecto un error
};

  };
}

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({       // 3 así establezco este tipo de formularios y dentro el config
      nombre: new FormControl ( null, Validators.required ),
      correo: new FormControl ( null, [Validators.required, Validators.email] ),
      password: new FormControl ( null, Validators.required),
      password2: new FormControl ( null, Validators.required),
      condiciones: new FormControl ( false),   // la dejo opcionales para que salga popup de mensaje

    }, { validators: this.sonIguales ( 'password', 'password2' ) } );  // 4)

  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      Swal.fire ({
        icon: 'warning', text: 'Debe de aceptar las condiciones para continuar! ' });
        // console.log ('debe aceptar las condiciones');
      return;
    }

   // console.log( 'forma valdida', this.forma.valid ); // para saber si el fornulario es valido
   // console.log( this.forma.value);    // muestra todos los valores cargados en el form

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );
      // tslint:disable-next-line: align
      this._usuarioService.crearUsuario (usuario)       // llamamos al servicio
              //
              .subscribe (

                ok => {

                this.router.navigate(['/login']);

                },
                (err: any) => {

                  // console.log(err);
                  Swal.fire ('cuenta de email existente en nuestros registros!');

                });

              }
            }

/*
    https://sweetalert2.github.io/      !!!!!!

  2) creo un objeto forma de tipo formGroup
  3) declaro toda esta parte del formulario: como quiero que trabaje, reglas etc
  todos los campos que tengo en el HTML que quiero controlar por esta forma y en html y
  agrego en la etiqueta form lo siguiente: [formGroup]="forma"
  para que sea reconocido como un componente de angular debo en app.module importar ReactiveFormsModule
  4) regla de validación especial
  5) con el return me saca el error cuando se llama en la parte validators: this.sonIguales
*/
