import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 800px;"></div>`,
  standalone: true,
  imports: [CommonModule],
  styles: []
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | null = null;

  constructor() {
    
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([36.140694, -86.798191], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([36.140980, -86.798191])
      .bindPopup('Gillette House')
      .addTo(this.map);
    
    L.marker([36.140632,-86.797758])
      .bindPopup('Memorial House')
      .addTo(this.map);

    L.marker([36.140324,-86.798294])
      .bindPopup('East House')
      .addTo(this.map);
    
    L.marker([36.140675,-86.796748])
      .bindPopup('Hank Ingram House')
      .addTo(this.map);
    
    L.marker([36.140268,-86.797334])
      .bindPopup('Stambaugh House')
      .addTo(this.map);

    L.marker([36.139930,-86.796894])
      .bindPopup('Murray House')
      .addTo(this.map);
    
    L.marker([36.139683,-86.797404])
      .bindPopup('Sutherland House')
      .addTo(this.map);

    L.marker([36.140008,-86.797817])
      .bindPopup('Crawford House')
      .addTo(this.map);
    
    L.marker([36.140467,-86.799664])
      .bindPopup('West House')
      .addTo(this.map);
    
    L.marker([36.141134,-86.799572])
      .bindPopup('North House')
      .addTo(this.map);
  }
}