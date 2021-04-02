import { Component, AfterViewInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;

  private initMap(): void {
    this.map = Leaflet.map('map', {
      center: [39.980855198426056, 39.980855198426056],
      zoom: 12,
    });



    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();

    Leaflet.marker([39.980855198426056, 39.980855198426056]).addTo(this.map).bindPopup('Arac 1').openPopup();
    Leaflet.marker([39.87536707214347, 32.74858563331525]).addTo(this.map).bindPopup('Arac 2').openPopup();
    Leaflet.marker([39.90043558749147, 32.7660496475146]).addTo(this.map).bindPopup('Arac 3').openPopup();

    antPath([[39.980855198426056, 32.87719621511067], [30,], [39.87536707214347, 32.748585633315251]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }
}
