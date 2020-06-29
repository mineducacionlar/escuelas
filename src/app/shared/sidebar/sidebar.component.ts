import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

usuario: Usuario;

  constructor( public _SIDEBAR: SidebarService,

               // tslint:disable-next-line: variable-name
               public _usuarioService: UsuarioService
    ) { }  // 1)

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._SIDEBAR.cargarMenu();
  }

}



/*
1) importo el sidebar.service para poder utilizar las propiedad del (objeto menu)
2) dentro del html del sidebar coloco routerLinkActive="active" routerLink="/account-settings"
y coloco <li *ngFor="let menu of _SIDEBAR.menu"> para recorrer elementos del menu

*/
