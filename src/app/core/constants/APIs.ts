import { environment } from "src/environments/environment.prod";

export default {
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/customer/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/customer/register',
  
  //home
  API_SEARCH_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/search',
  API_SEARCH_SITE: environment.BASE_PATH_DOMAIN + '/site/findAll',
  API_SEARCH_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/room-type/search',
  API_GET_HOTEL_DETAIL: environment.BASE_PATH_DOMAIN + '/hotel/detail',

  //booking tour
  API_SEARCH_TOUR: environment.BASE_PATH_DOMAIN + '/tour/findAll',
  API_GET_TOUR_DETAIL: environment.BASE_PATH_DOMAIN + '/tour/detail',

}
