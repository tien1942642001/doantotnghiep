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

  isLoggedIn = false;
  redirectUrl!: string;

  // <div *ngIf="authService.isLoggedIn">
  //   Đây là trang được bảo vệ bởi đăng nhập
  // </div>
  // <div *ngIf="!authService.isLoggedIn">
  //   Bạn cần đăng nhập để truy cập trang này
  // </div>

  // export class MyProtectedPageComponent {
  //   constructor(private authService: AuthService, private router: Router) {}
  
  //   ngOnInit() {
  //     if (!this.authService.isLoggedIn) {
  //       this.authService.redirectUrl = this.router.url;
  //       this.router.navigate(['/login']);
  //     }
  //   }
  // }
  
  login(email: any, password: any): Observable<any> {
    // return this.http.post(`${APIs.AUTH_LOGIN}`, {
      this.isLoggedIn = true;
      return this.http.post(`${APIs.AUTH_LOGIN}`, {
        email: email,
        password: password,
      });
  };

  logout(): void {
    this.isLoggedIn = false;
  }

  register(body: any): Observable<any> {
    return this.http.post(`${APIs.AUTH_REGISTER}`, body);
  };

  detail(id: any): Observable<any> {
    return this.http.get(`${APIs.API_CUSTOMER_DETAIL}/${id}`);
  };

  update(id: any, body: any): Observable<any> {
    return this.http.put(`${APIs.API_CUSTOMER_UPDATE}/${id}`, body);
  };

  searchPost(customerId: any, page: any, size: any): Observable<any> {
    return this.http.get(`${APIs.API_SEARCH_POST}?customerId=${customerId}&page=${page}&size=${size}`);
  };

  detailPost(id: any): Observable<any> {
    return this.http.get(`${APIs.API_GET_DETAIL_POST}/${id}`);
  };
}
