import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map , filter} from 'rxjs/operators';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

         this.subscription = this.regresaObservable()   // mantengo la referencia con el observable con subscription
        .subscribe(   // 4) escucha los eventos y contiene 3 callbacks
        numero => console.log (' subs ', numero),   // next
        error => console.error('error del obs', error),  // error
        () => console.log ('el observador termino') // cuando termina
      );
  }

  ngOnInit() {}

    ngOnDestroy() {   // se dispara cada vez que yo vaya a dejar la página
      console.log('La página se va a cerrar');
      this.subscription.unsubscribe();  // elimino la subscripción
  }

  regresaObservable(): Observable<any> {

   return new Observable( (observer: Subscriber<any>) => {  // 1)    // obs= observable en si

      let contador = 0;

      let intervalo = setInterval( () => {    // 2

        contador += 1;

        const salida = {     // ahora en vez de regresar el contador, regresa un objeto
          valor: contador
        };

        observer.next (salida); // 3) emite los eventos   // observador ahora .next sera salida (objeto)

/*        if (contador === 3) {  // contador = 3 se detenga
          clearInterval ( intervalo); // detengo el intervalo pero la escucha del observer sigue
          observer.complete(); // 6)
        }  comento para que las rtas sean infinitas*/ 

/*         if (contador === 2) {
           clearInterval ( intervalo);
          observer.error('auxilio');  // recibe notificación en caso de error
        } */

      }, 1000 );
    }).pipe(
      map( resp => resp.valor),     // recibe una fx que me permite transformar la data, recibe la rta en bruto resp  
      filter (( valor, index ) => {
        if ( ( valor % 2) === 1) {
          return true;  // par
        } else {
          return false;
        }
      })
    );

  }

  }


/* 1) observable no es nativo de ES6 hay que importarlo from 'rxjs' (reactive extension)
en un Observable recibimos un objeto que se llama observer y su tipo es subscriber (que no hace falta
  colocarlo por que es redundante observer:subscribe)
  si a este objeto observer le coloco . puedo ver todas sus propiedades
  2) creo un intervalo que cada 1 sgs la fx emita un valor 
  3) PARA SALIR de la fx con un observador hacemos referencia al objeto observer con la fx .next
  este observable va a estar notificando mediante este next los valores del contador, notificar que llego
  un 1,2,3...
  4) Para poder escuchar todo el trabajo que esta haciendo el obs tengo que subscribirme, como se que va a
  recibir un numero. este recibe 3 callback 
  el primero para cuando recibo info del next
  el segundo para el error
  y el tercero callback que no recibe ningún parametro

  6) como notifico que no voy a recibir mas datos, que termino mi observable ? existe una fx en el observer
  que se llama .complete}

  el operador retry (de la libreria rxjs) nos permitirá a volver hacer la solicitud la veces que querramos
  todos los observables tiene una fx pipe (tuberia) que me permite de alguna manera transformar la info o hacer
  un proceso de transformación de datos, lo cual me permite definir una serie de operadores como el retry

7) fx que retornan observables:

creo fx regresaObservable() y coloco todo el contenido menos pipe
le tengo que especificar que valor regresa que será un observable y el tipo de dato Observable<number> 

Operador Map de los observables:

Permite tomar la info en bruto y transforma la salida en otra cosa. por lo gral es la misma info 
que estoy recibiendo expresada de otra manera.
Se ejecuta Justo después de donde ya obtenemos la info del observador o cuando tenemos la rta del API etc
lo puede hacer dentro del pipe de los rxjs 
lo interesante del operador map es que transforma la info en lo que nosotros necesitemos.

Operador Filter:
El mejor lugar es dentro del pipe que es donde ya estoy obteniendo la info respuesta de mi observador
a fuerza debe retornar un true o un false
recibe 2 params: el valor que es la rta en este caso y la posición index (nro que se llamo al index)

llamada al unsubscribe
para cancelar el observador al cambiar de página para trabajar en otra, tengo que implementar el 
OnDestroy que me permite saber cuando la persona se esta yendo del componente.

// subscription es una propiedad que pueda usar como referencia a la  fx que esta en el constructor 
  */
