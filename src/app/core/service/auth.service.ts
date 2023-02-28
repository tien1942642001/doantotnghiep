import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated() {
    throw new Error("Method not implemented.");
  }
  constructor(
    private http: HttpClient
  ) {}

  apiUrl = "https://platform.datacom.vn/flights/search";
  
  login(body: any): Observable<any> {
    // return this.http.post(`${APIs.AUTH_LOGIN}`, {
      return this.http.post(`http://localhost:8080/login`, {
        username: body.username,
        password: body.password
    });
  };

  register(body: any): Observable<any> {
    return this.http.post(`${APIs.AUTH_REGISTER}`, body);
  };
}
