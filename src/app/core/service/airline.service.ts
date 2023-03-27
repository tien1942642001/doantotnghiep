import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import APIs from "../constants/APIs";
import handle from "../functions/handle";

@Injectable({
  providedIn: 'root',
})
export class AirrlineService {
    private apiUrl = 'https://api.airlabs.co';
  constructor(
    private http: HttpClient
  ) {}

  getFlightSchedule(origin: string, destination: string, date: string) {
    const url = `${this.apiUrl}/v1/flights`;

    const headers = new HttpHeaders({
      'X-API-Key': 'cfda66b2-c46c-44f8-95b6-a21d847df120'
    });

    const params = new HttpParams()
      .set('from', origin)
      .set('to', destination)
    //   .set('date', date);

    return this.http.get(url, { headers, params });
  }
}
