import { Component } from '@angular/core';
import { last, map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GPSService } from '../services/gps.service';
import { SocketService } from '../services/socket-service.service';

import * as dummyGPSData from '../../assets/gpsData.json';

export class Record{
  deviceID: string;
      location: {
          type: string;
          coordinates: number[];
      };
      speed: number;
      timestamp: number;
      t0: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SocketService, GPSService]
})
export class DashboardComponent {

  constructor(private breakpointObserver: BreakpointObserver, private gpsService: GPSService) {
    gpsService.records.subscribe(record => {
      console.log("response from websocket: ");
      console.log(this.lastRecord);
    });
  }


  public records: Record[] = dummyGPSData.gpsData;

  // Simulate to show real-time with delaying
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private lastRecord: Record;

  async sendRecords() {
    console.log("Send data to websocket api");

    this.records.forEach(async record => {
      this.gpsService.records.next(record);

      await this.delay(1000);
    });

  }

  ngOnInit() {

  }
}
