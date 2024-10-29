import { CommonModule } from '@angular/common';
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import { CandyReviewPopupComponent } from '../candy-review-popup/candy-review-popup.component';
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

  markersData: { coords: [number, number], title: string, description: string, icon?: L.MarkerOptions }[] = [
    { coords: [36.1412, -86.798191], title: 'Gillette House', description: '10/10 candy'},
    { coords: [36.140732, -86.797758], title: 'Memorial House', description: '' },
    { coords: [36.1405, -86.798294], title: 'East House', description: '' },
    { coords: [36.140675, -86.796748], title: 'Hank Ingram House', description: '' },
    { coords: [36.140468, -86.797334], title: 'Stambaugh House', description: '' },
    { coords: [36.14, -86.796894], title: 'Murray House', description: '' },
    { coords: [36.139883, -86.797404], title: 'Sutherland House', description: '' },
    { coords: [36.140008, -86.797817], title: 'Crawford House', description: '' },
    { coords: [36.140567, -86.799664], title: 'West House', description: '' },
    { coords: [36.141234, -86.799572], title: 'North House', description: '' }
  ];

  private initMap(): void {
    this.map = L.map('map').setView([36.140694, -86.798191], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.houses.forEach(markerData => {
      let coords: [number, number] = [0,0]

      coords[0] = markerData.coordinates._lat
      coords[1] = markerData.coordinates._long

      const marker = L.marker(coords, this.icon).addTo(this.map);
      
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CandyReviewPopupComponent);
      const componentRef = componentFactory.create(this.viewContainerRef.injector);
      
      componentRef.instance.title = markerData.name;
      componentRef.instance.description = "Candy rating: " + markerData.rating;
      
      this.viewContainerRef.insert(componentRef.hostView);
      marker.bindPopup(componentRef.location.nativeElement);
    });
  }
}