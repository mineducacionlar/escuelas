import { Component, OnInit } from '@angular/core';
import { Escuela } from 'src/app/models/escuela.model';
import { EscuelaService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DirectorService } from 'src/app/services/director/director.service';
import { Director } from 'src/app/models/director.model';

@Component({
  selector: 'app-escuela',
  templateUrl: './escuela.component.html',
  styles: []
})
export class EscuelaComponent implements OnInit {

  directores: Director[] = [];
  escuela: Escuela = new Escuela('', '', ''); // 1)   ******************¨¨¨¨
  director: Director = new Director('');

  constructor(
    // tslint:disable-next-line: variable-name
    public _escuelaService: EscuelaService, // 2)
    // tslint:disable-next-line: variable-name
    public _directorService: DirectorService,
    // tslint:disable-next-line: variable-name
    public router: Router, // ocupo el router para poder navegar
    public activatedRoute: ActivatedRoute,  // para poder leer el id que paso para editar la escuela
  ) {

    activatedRoute.params.subscribe( params => {
      // tslint:disable-next-line: no-string-literal
      let id = params[ 'id' ];  // id por que en el pageRouter le coocamos ese valor
      if ( id !== 'nuevo' ) { // si no es nuevo cargo la escuela
        this.cargarEscuela ( id ); // y le paso el id
      }
    });

   }

  ngOnInit() {
       this._directorService.cargarDirectoresCbo()
                            .subscribe(directores => this.directores = directores);
  }



  cargarEscuela(id: string ) {   // va a recibir el id de la escuela que quiero buscar
    this._escuelaService.obtenerEscuela( id )  // llamo a la fx del servicio y le envío el id
                        .subscribe (escuela => {

                          this.escuela = escuela;
                       //   console.log (this.escuela);

                        });  // en el subscribe voy a reibir una escuela y la inicializao => con this.escuela paso 1
                                                                        // y lo igualo para decir que esa escuela es lo que vino del subscribe
  }





  guardarEscuela( f: NgForm ) { // 3

    //   console.log( f.valid );
     //  console.log( f.value );

       if ( f.invalid ) {
         return;
       }
       // si es valido el formulario lo guardamos al mismo
       this._escuelaService.crearEscuela(this.escuela)   // enviamos la escuela que creamos en el punto 1
               .subscribe( escuela => {  // vamos a recibir la escuela y ya nos permite crear la escuela en este paso!
             //    console.log ('datos de la escuela', escuela);
                 this.escuela._id = escuela._id;
                 this.router.navigate(['/escuela', escuela._id ]);  // para navegar hacia la url para editar luego de haber creado la escuela

               });

     }

cambioDirector( id: string ) {

  this._directorService.cargarDirector( id )
  .subscribe( director => this.director = director );

    }



}
