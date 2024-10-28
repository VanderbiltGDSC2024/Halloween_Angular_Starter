import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 400px;"></div>`,
  styles: []
})
export class MapComponent implements AfterViewInit {
  private map: L.Map;

  constructor() {
    
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker example
    L.marker([51.5, -0.09])
      .bindPopup('A sample marker!')
      .addTo(this.map);
  }
}