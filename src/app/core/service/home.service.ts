import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient
  ) {}

  getAllHotel(pageSize: Number, pageIndex: Number, siteId: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_HOTEL}?page=${pageIndex}&size=${pageSize}&siteId=${siteId}`)
  }

  getHotelDetail(hotelId: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_HOTEL_DETAIL}/${hotelId}`)
  }

  getAllSite(): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(APIs.API_SEARCH_SITE);
  }

  getAllRoomType(pageSize: Number, pageIndex: Number, hotelId: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_ROOM_TYPE}?page=${pageIndex}&size=${pageSize}&hotelId=${hotelId}`)
  }
}
