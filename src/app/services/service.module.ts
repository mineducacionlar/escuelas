import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
 /* objetivo del modulo es tener centralizado todos los servicios para poder proveerlo en un único archivo
 es decir no tener en el app.module.ts en la parte de providers todos los servicios que se vayan usando */

// Proveemos todos los servicios al modulo

import {
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        EscuelaService,
        LoginGuardGuard,
        AdminGuard,
        SubirArchivoService,
        VerificaTokenGuard,
      } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,   // proveeo los servicios
    UsuarioService,
    EscuelaService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    VerificaTokenGuard,
  ]
})
export class ServiceModule { }
