import { environment } from "src/environments/environment.prod";

export default {
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/register',
  
  //home
  API_SEARCH_HOTEL: environment.BASE_PATH_DOMAIN + '/hotel/search',
  API_SEARCH_SITE: environment.BASE_PATH_DOMAIN + '/site/findAll',
  API_SEARCH_ROOM_TYPE: environment.BASE_PATH_DOMAIN + '/room/roomType/search',

}
