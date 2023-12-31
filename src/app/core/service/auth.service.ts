import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import APIs from "../constants/APIs";
import handle from "../functions/handle";

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
      const headers = handle.requestHeaders();
    let options = {headers: headers};
      return this.http.post(`${APIs.AUTH_LOGIN}`, {
        email: email,
        password: password,
      }, options);
  };

  logout(): void {
    this.isLoggedIn = false;
  }

  register(body: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.post(`${APIs.AUTH_REGISTER}`, body , options);
  };

  detail(id: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_CUSTOMER_DETAIL}/${id}` , options);
  };

  update(id: any, body: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.put(`${APIs.API_CUSTOMER_UPDATE}/${id}`, body , options);
  };

  searchPost(customerId: any, page: any, size: any, sort: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_SEARCH_POST}?customerId=${customerId}&page=${page}&size=${size}&sort=${sort}` , options);
  };

  detailPost(id: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_GET_DETAIL_POST}/${id}`, options);
  };

  searchComment(idPost: any, page: any, size: any, sort: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_COMMENT}/${idPost}/comments/search?page=${page}&size=${size}&sort=${sort}` , options);
  };

  addComment(idPost: any, data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.post(`${APIs.API_COMMENT}/${idPost}/comments/create`, data, options);
  };

  updateComment(idPost: any, id: any, data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.put(`${APIs.API_COMMENT}/${idPost}/comments/update/${id}`, data, options);
  };

  deleteComment(idPost: any, idComment: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.get(`${APIs.API_COMMENT}/${idPost}/comments/delete/${idComment}`, options);
  };

  updateLike(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.post(`${APIs.API_LIKE_SAVE}`, data, options);
  };

  checkCustomerLike(data: any): Observable<any> {
    const headers = handle.requestHeaders();
    let options = {headers: headers};
    return this.http.post(`${APIs.API_LIKE_CHECK}`, data, options);
  }
}
