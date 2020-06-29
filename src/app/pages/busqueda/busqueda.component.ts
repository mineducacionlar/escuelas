import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // para realizar una petición por aquí
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.models';
import { Director } from 'src/app/models/director.model';
import { Escuela } from 'src/app/models/escuela.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  directores: Director[] = [];
  escuelas: Escuela[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,   // para poder recibir el parametro por la URL
    public http: HttpClient
  ) {

      activatedRoute.params
        .subscribe( params => {
          // tslint:disable-next-line: no-string-literal
          let termino = params ['termino'];
          this.buscar(termino);
        });
  }


  ngOnInit() {}

  buscar( termino: string) {

    let url = URL_SERVICIOS + '/busqueda/all/' + termino;

    this.http.get( url )
             .subscribe( (resp: any) => {

                console.log ( resp );
                this.usuarios = resp.usuarios;
                this.directores = resp.directores;
                this.escuelas = resp.escuelas;

                });

  }

}
