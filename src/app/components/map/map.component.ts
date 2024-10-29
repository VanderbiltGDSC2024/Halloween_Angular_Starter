import { CommonModule } from '@angular/common';
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import { getData } from '../../../backend/firebase';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 800px;"></div>`,
  standalone: true,
  imports: [CommonModule],
  styles: []
})
export class MapComponent implements OnInit {
  private map: L.Map | L.LayerGroup<any>;
    
  icon = {
    icon: L.icon({
      iconSize: [28, 42],
      iconAnchor: [13, 0],
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
    })
  };

  houses: any[] = [];
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  async ngOnInit(): Promise<void> {
    this.houses = await getData();
    this.initMap()
  }

  private initMap(): void {
    this.map = L.map('map').setView([36.14, -86.798191], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.houses.forEach(markerData => {
      
      /* For part 2 of the workshop: */
      // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CandyReviewPopupComponent);
      // const componentRef = componentFactory.create(this.viewContainerRef.injector);
      
      // componentRef.instance.title = markerData.name;
      // componentRef.instance.description = "Candy rating: " + markerData.rating;
      
      // this.viewContainerRef.insert(componentRef.hostView);
      
      // TODO for part one: marker.bindPopup("<h2>Fix me</h2>");
    });
  }
}