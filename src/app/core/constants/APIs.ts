import { environment } from "src/environments/environment.prod";

export default {
  AUTH_LOGIN: environment.BASE_PATH_DOMAIN + '/login',
  AUTH_REGISTER: environment.BASE_PATH_DOMAIN + '/register',
}
