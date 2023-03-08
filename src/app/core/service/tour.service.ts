import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(
    private http: HttpClient
  ) {}

  getAllTour(name: any, leavingToId: any, pageSize: Number, pageIndex: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_TOUR}?name=${name}&leavingToId=${leavingToId}&page=${pageIndex}&size=${pageSize}`)
  }

  getDetailTour(id: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_TOUR_DETAIL}/${id}`)
  }
}
