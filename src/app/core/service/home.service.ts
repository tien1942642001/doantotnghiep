import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient
  ) {}

  apiUrl = "https://platform.datacom.vn/flights/search";

  login(body: any) {
    return this.http.post(this.apiUrl, body)
  }
}
