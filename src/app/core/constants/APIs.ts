import { environment } from "src/environments/environment.prod";

export default {
  //user
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/customer/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/customer/register',
  API_CUSTOMER_DETAIL: environment.BASE_PATH_DOMAIN + '/customer/detail',
  API_CUSTOMER_UPDATE: environment.BASE_PATH_DOMAIN + '/customer/update',
  
  //home
  API_SEARCH_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/search/customer',
  API_SEARCH_SITE: environment.BASE_PATH_DOMAIN + '/site/findAll',
  API_SEARCH_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/room-type/search',
  API_GET_HOTEL_DETAIL: environment.BASE_PATH_DOMAIN + '/hotel/detail',
  API_GET_BOOKING_HOTEL: environment.BASE_PATH_DOMAIN + '/booking-room/booking',
  API_GET_BOOKING_TOUR: environment.BASE_PATH_DOMAIN + '/booking-tour/booking',
  
  // tour
  API_SEARCH_TOUR: environment.BASE_PATH_DOMAIN + '/tour/search',
  API_GET_TOUR_DETAIL: environment.BASE_PATH_DOMAIN + '/tour/detail',
  
  //booking room, tour
  API_CHECK_BOOKING_ROOM_OK: environment.BASE_PATH_DOMAIN + '/booking-room/check-payment-room-ok',
  
  API_SEARCH_BOOKING_ROOM: environment.BASE_PATH_DOMAIN + '/booking-room/search',
  API_SEARCH_BOOKING_TOUR: environment.BASE_PATH_DOMAIN + '/booking-tour/search',
  
  API_DETAIL_BOOKING_ROOM: environment.BASE_PATH_DOMAIN + '/booking-room/detail',
  API_DETAIL_BOOKING_TOUR: environment.BASE_PATH_DOMAIN + '/booking-tour/detail',

  API_BOOKING_ROOM_BY_PAYMENT_CODE: environment.BASE_PATH_DOMAIN + '/booking-room/findByPaymentCode',

  //post
  API_SEARCH_POST: environment.BASE_PATH_DOMAIN + '/post/search',
  API_ADD_POST: environment.BASE_PATH_DOMAIN + '/post/add',
  API_GET_DETAIL_POST: environment.BASE_PATH_DOMAIN + '/post/detail',
}
