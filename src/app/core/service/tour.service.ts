import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";
import handle from "../functions/handle";

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(
    private http: HttpClient
  ) {}

  getAllTour(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let queryParams = new HttpParams();
    if (data.name) {
      queryParams = queryParams.append("searchName",data.name);
    }
    if (data.typeOfTours) {
      for (let index = 0; index < data.typeOfTours.length; index++) {
        queryParams = queryParams.append("typeOfTours",data.typeOfTours[index]);
      }
    }
    if (data.suitableIds) {
      for (let index = 0; index < data.suitableIds.length; index++) {
        queryParams = queryParams.append("suitableIds",data.suitableIds[index]);
      }
    }
    if (data.lengthStayIds) {
      for (let index = 0; index < data.lengthStayIds.length; index++) {
        queryParams = queryParams.append("lengthStayIds",data.lengthStayIds[index]);
      }
    }
    if (data.siteId) {
      queryParams = queryParams.append("siteId",data.siteId);
    }
    if (data.page) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_SEARCH_TOUR}`, options)
  }

  getDetailTour(id: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_TOUR_DETAIL}/${id}`, options)
  }
}
