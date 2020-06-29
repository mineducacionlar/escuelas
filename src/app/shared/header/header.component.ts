import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;


  constructor(

     // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    public router: Router
     ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string) {  // Recibe el termino de busqueda
      this.router.navigate( ['/busqueda', termino ]);   // llaves [] por que recibe un arreglo
  }

}
