import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  tileLayer,
  latLng,
  LeafletMouseEvent,
  Marker,
  marker,
  icon
} from 'leaflet';
import { Coordenada } from './coordenada';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @Input() coordenadasIniciales: Coordenada[] = [];
  @Output() locationSelected: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 16,
    center: latLng(19.289431595869107,-99.6224355697632)
  };
  capas: Marker<any>[] = [];

  constructor() { }

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(valor => marker([valor.latitud, valor.longitud], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    }));
    if(this.coordenadasIniciales.length > 0){
      this.coordenadasIniciales.map(valor => 
        this.options.center = latLng(valor.latitud, valor.longitud)
      );
    }
  }

  handleClick(event: LeafletMouseEvent) {
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    this.capas = [];
    this.capas.push(marker([latitud, longitud], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    }));
    this.locationSelected.emit({ latitud: latitud, longitud: longitud });
  }

}
