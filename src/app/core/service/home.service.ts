import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import APIs from "../constants/APIs";
import handle from "../functions/handle";
import axios from "axios";
import constants from "../constants/constants";

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

  getAllHotelByCustomerId(customerId: Number, siteId: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_LIST_HOTEL_BY_CUSTOMER_ID}?customerId=${customerId}&siteId=${siteId}`, options)
  }

  getAllSiteByCustomerId(customerId: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_LIST_SITE_BY_CUSTOMER_ID}?customerId=${customerId}`, options)
  }

  getAllHotel(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let queryParams = new HttpParams();
    if (data.siteId) {
      queryParams = queryParams.append("siteId",data.siteId);
    }
    if (data.page || data.page == 0) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    if (data.sort) {
      queryParams = queryParams.append("sort",data.sort);
    }
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_SEARCH_HOTEL}`, options)
  }

  getHotelDetail(hotelId: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_HOTEL_DETAIL}/${hotelId}`, options)
  }

  getAllSite(): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(APIs.API_SEARCH_SITE, options);
  }

  getAllRoomType(pageSize: Number, pageIndex: Number, hotelId: Number, numberPerson: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_ROOM_TYPE}?page=${pageIndex}&size=${pageSize}&hotelId=${hotelId}&numberPerson=${numberPerson}`, options)
  }

  bookingRoom(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.post(APIs.API_GET_BOOKING_HOTEL, data, options);
  }

  bookingTour(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.post(APIs.API_GET_BOOKING_TOUR, data, options);
  }

  addPost(formData: any) {
    return axios.post(`${APIs.API_ADD_POST}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN) as string}`,
      }
    });
};

  searchPost(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let queryParams = new HttpParams();
    if (data.page || data.page == 0) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    if (data.sort) {
      queryParams = queryParams.append("sort",data.sort);
    }
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_SEARCH_POST}`, options)
  }

  searchBookingRoom(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let queryParams = new HttpParams();
    if (data.customerId || data.customerId == 0) {
      queryParams = queryParams.append("customerId",data.customerId);
    }
    if (data.code) {
      queryParams = queryParams.append("code",data.code);
    }
    if (data.status || data.status == '0') {
      queryParams = queryParams.append("status",parseInt(data.status));
    }
    if (data.startTime) {
      queryParams = queryParams.append("startTime",data.startTime);
    }
    if (data.endTime) {
      queryParams = queryParams.append("endTime",data.endTime);
    }
    if (data.page || data.page == 0) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    if (data.sort) {
      queryParams = queryParams.append("sort",data.sort);
    }
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_SEARCH_BOOKING_ROOM}`, options)
  }

  searchBookingTour(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let queryParams = new HttpParams();
    if (data.customerId || data.customerId == 0) {
      queryParams = queryParams.append("customerId",data.customerId);
    }
    if (data.code) {
      queryParams = queryParams.append("code",data.code);
    }
    if (data.status || data.status == '0') {
      queryParams = queryParams.append("status",parseInt(data.status));
    }
    if (data.startTime) {
      queryParams = queryParams.append("startTime",data.startTime);
    }
    if (data.endTime) {
      queryParams = queryParams.append("endTime",data.endTime);
    }
    if (data.page || data.page == 0) {
      queryParams = queryParams.append("page",data.page);
    }
    if (data.size) {
      queryParams = queryParams.append("size",data.size);
    }
    if (data.sort) {
      queryParams = queryParams.append("sort",data.sort);
    }
    let options = {
      headers: headers,
      params: queryParams,
    };
    return this.http.get(`${APIs.API_SEARCH_BOOKING_TOUR}`, options)
  }

  checkBookingRoomOk(id: any, body: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.put(`${APIs.API_CHECK_BOOKING_ROOM_OK}/${id}`, body, options);
  };

  checkBookingTourOk(id: any, body: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.put(`${APIs.API_CHECK_BOOKING_TOUR_OK}/${id}`, body, options);
  };

  getBookingRoomDetail(id: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_DETAIL_BOOKING_ROOM}/${id}`, options)
  }

  getBookingTourDetail(id: Number): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_DETAIL_BOOKING_TOUR}/${id}`, options)
  }

  getBookingRoomByPaymentCode(code: String): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_BOOKING_ROOM_BY_PAYMENT_CODE}/${code}`, options)
  }

  getBookingTourByPaymentCode(code: String): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_BOOKING_TOUR_BY_PAYMENT_CODE}/${code}`, options)
  }
}
