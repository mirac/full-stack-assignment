import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { SocketService } from "./socket-service.service";

const Service_URL = "ws://localhost:8080/";

export interface LocationRecord {
  deviceID: string;
  location: {
    type: string;
    coordinates: number[];
  };
  speed: number;
  timestamp: number;
  t0: number;
}

@Injectable()
export class GPSService {
  public records: Subject<LocationRecord>;

  constructor(wsService: SocketService) {
    this.records = <Subject<LocationRecord>>wsService.connect(Service_URL).map(
      (response: MessageEvent): LocationRecord => {
        let data = JSON.parse(response.data);
        console.log("response from websocket: ");
        console.log(response.data);

        return {
          deviceID: data.deviceID,
          location: data.location,
          speed: data.speed,
          timestamp: data.timestamp,
          t0: data.t0
        };
      }
    );
  }
}
