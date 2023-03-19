import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import APIs from "../constants/APIs";
import handle from "../functions/handle";

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private sharingDataRoom = new BehaviorSubject('');
  dataRoom = this.sharingDataRoom.asObservable();

  private sharingDataTour = new BehaviorSubject('');
  dataTour = this.sharingDataTour.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  saveDataRoom(data: any) {
    this.sharingDataRoom.next(data);
  }

  saveDataTour(data: any) {
    this.sharingDataTour.next(data);
  }

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

  getAllRoomType(pageSize: Number, pageIndex: Number, hotelId: Number, numberPerson: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_ROOM_TYPE}?page=${pageIndex}&size=${pageSize}&hotelId=${hotelId}&numberPerson=${numberPerson}`)
  }

  bookingRoom(data: any): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.post(APIs.API_GET_BOOKING_HOTEL, data);
  }

  bookingTour(data: any): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.post(APIs.API_GET_BOOKING_TOUR, data);
  }

  addPost(formData: any): Observable<any> {
    const headers = handle.requestHeadersFormData();
    let options = {headers: headers};
    return this.http.post(`${APIs.API_ADD_POST}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  };

  searchBookingRoom(customerId: any, code: any, status: any, startTime: any, endTime: any, pageSize: Number, pageIndex: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_BOOKING_ROOM}?customerId=${customerId}&code=${code}&status=${status}&startTime=${startTime}&endTime=${endTime}&page=${pageIndex}&size=${pageSize}`)
  }

  searchBookingTour(customerId: any, code: any, status: any, startTime: any, endTime: any, pageSize: Number, pageIndex: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_BOOKING_TOUR}?customerId=${customerId}&code=${code}&status=${status}&startTime=${startTime}&endTime=${endTime}&page=${pageIndex}&size=${pageSize}`)
  }

  checkBookingRoomOk(id: any, body: any): Observable<any> {
    return this.http.put(`${APIs.API_CHECK_BOOKING_ROOM_OK}/${id}`, body);
  };

  getBookingRoomDetail(id: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_DETAIL_BOOKING_ROOM}/${id}`)
  }

  getBookingTourDetail(id: Number): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_DETAIL_BOOKING_TOUR}/${id}`)
  }

  getBookingRoomByPaymentCode(code: String): Observable<any> {
    // const headers = handle.requestHeaders();
    // let options = {headers: headers};
    return this.http.get(`${APIs.API_BOOKING_ROOM_BY_PAYMENT_CODE}/${code}`)
  }
}
