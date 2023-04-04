import { Router } from '@angular/router';
import constants from '../constants/constants';
import { CoreModule } from '../core.module';
import { HttpHeaders } from "@angular/common/http";
// import {CoreModule} from '../core.module';

function requestHeaders() {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN) as string}`,
    // 'Authorization': "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6IkphbmUgRG9lIiwicGFzc3dvcmQiOiJqYW5lQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJqYW5lQGV4YW1wbGUuY29tIiwic3ViIjoiamFuZSIsImp0aSI6ImU3YThhNWQ1LWNlNDUtNDE0Mi1hODhlLTJiNDM4NTQyY2E2MCIsImlhdCI6MTY3MjcyNjA4MCwiZXhwIjoxNjc1MzE4MDgwfQ.c4AOlhO-K9qnW_MX0kmnoIg7CX1byGJBXCg-8tB3KsBu_xazVAKVxCPD-SBZfsWFUCcgBABNo8DyYVlRz_0sGV9BGUkVDaih0n5GMOkRkONvdXcwEvinFJd1AdEzDHEMdfbnQNM3MhcPhDjvq5wtHIFJnia6KXdIHVNNesTWQONGEiQxSuRI7TT-92qN7xVRzWlZxuA_2smOXZwB-6u1HM_hGw4d7wJhNkm_hsECBc-QuT2KaVViYsradkSjiiW-FGz94ThNEvIUJ62xmiUC6vzlocb5b2bTWvxZSpdZO44qsDFADuDVkXGIu1MwWxE5RDYDWrAaBQo_raR58u-Xlw"
  });
}

function requestHeadersFormData() {
return new HttpHeaders({
  "Content-Type": "multipart/form-data",
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem(constants.TOKEN) as string}`,
  // 'Authorization': "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6IkphbmUgRG9lIiwicGFzc3dvcmQiOiJqYW5lQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJqYW5lQGV4YW1wbGUuY29tIiwic3ViIjoiamFuZSIsImp0aSI6ImU3YThhNWQ1LWNlNDUtNDE0Mi1hODhlLTJiNDM4NTQyY2E2MCIsImlhdCI6MTY3MjcyNjA4MCwiZXhwIjoxNjc1MzE4MDgwfQ.c4AOlhO-K9qnW_MX0kmnoIg7CX1byGJBXCg-8tB3KsBu_xazVAKVxCPD-SBZfsWFUCcgBABNo8DyYVlRz_0sGV9BGUkVDaih0n5GMOkRkONvdXcwEvinFJd1AdEzDHEMdfbnQNM3MhcPhDjvq5wtHIFJnia6KXdIHVNNesTWQONGEiQxSuRI7TT-92qN7xVRzWlZxuA_2smOXZwB-6u1HM_hGw4d7wJhNkm_hsECBc-QuT2KaVViYsradkSjiiW-FGz94ThNEvIUJ62xmiUC6vzlocb5b2bTWvxZSpdZO44qsDFADuDVkXGIu1MwWxE5RDYDWrAaBQo_raR58u-Xlw"
});
}

function logout() {
    const route = CoreModule.injector.get<Router>(Router)
    let login = {
      username: "username",
      password: "password",
      remember: "false",
    }
    if(localStorage.getItem(constants.REMEMBER_ME) == "true") {
      login.username = localStorage.getItem(constants.EMAIL_REMEMBER)!,
      login.password = localStorage.getItem(constants.PASSWORD_REMEMBER)!,
      login.remember = localStorage.getItem(constants.REMEMBER_ME)!
    }
    localStorage.clear();
    localStorage.setItem(constants.LANG, 'vi');
    if(login.remember == "true") {
      localStorage.setItem(constants.EMAIL_REMEMBER, login.username);
      localStorage.setItem(constants.PASSWORD_REMEMBER, login.password);
      localStorage.setItem(constants.REMEMBER_ME, login.remember);
    }
    route.navigate(['auth/login'])
}

export default {
    logout: logout,
    requestHeaders: requestHeaders,
    requestHeadersFormData: requestHeadersFormData,
};
