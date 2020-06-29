import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title,      // 2)
               private meta: Meta ) {    //  3)

     this.getDataRoute() // llamo al subscribe en base a la fx getDataRoute
    .subscribe ( data => {
     // console.log (data);  // viene del map
     this.titulo = data.titulo;
     this.title.setTitle (this.titulo + ' - ' + 'GeoEscuelas');  // para colocarlo en el MetaTag de la página

     const metaTag: MetaDefinition = {
      name: 'description',
      content: this.titulo
     };

     this.meta.updateTag ( metaTag ); // para actualizar el html metastags (descripcion parte de código)

    });

   }

  ngOnInit() {
  }

  getDataRoute() {
   return this.router.events.pipe(     // con el return la fx retorna un nuevo observable
      filter( evento => evento instanceof ActivationEnd),  // me interesa únicamente lo que sea una instancia de activationEnd
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),  // para diferencias los 2 activationEnd que aparecen
      map ((evento: ActivationEnd) => evento.snapshot.data)  // para tomar propiedad data
      );
  }

}


/* 1) como puedo obtener los paramentros que se definieron en el pageRoutes: creo un objeto de tipo Router importando
la clase Router
El router tiene una propiedad llamada events, al ver las prop dentro de f12 encontramos la propiedad
ActivationEnd y dentro de snapchot, dentro de data el progress tengo la info que puse en la config del router
me interesa tomar el titulo y colocarlo en la info del breadcrums
1) obtener la referencia a los activationEnd dentro del pipe defino operadores para extraer info que me interesa
mediante el filter

2) clase title que se inyecta en el constructor pudiendo llamar a la prop setTitle para colocasrlo en el HTML

3) clase meta para poder agregar description al html y pueda ser leída por Google por ejemplo
*/

