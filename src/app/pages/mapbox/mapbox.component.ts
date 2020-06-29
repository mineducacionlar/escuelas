import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

  mapa: Mapboxgl.Map;

  constructor() { }

  ngOnInit() {

    (Mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
        container: 'mapa-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-66.8580877792063 , -29.417417589241055 ], // starting position
        zoom: 16 // starting zoom
        });
    // this.crearMarcador(-66.8580877792063 , -29.417417589241055);
  }

/*   crearMarcador(lng: number, lat: number)  {
    const marker = new Mapboxgl.Marker({
      draggable: false,
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

    marker.on('drag', () => {
      const lngLat = marker.getLngLat();
      console.log(lngLat);
      });

      } */
}
