import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import constants from '../constants/constants';
import handle from '../functions/handle';

@Injectable({ providedIn: 'root' })
export class AppInterceptor implements HttpInterceptor{

    constructor(
        // public jwtHelper: JwtHelperService,
        public router: Router,
    ) { }

    // public isAuthenticated(): boolean {
    //     const token = JSON.parse(localStorage.getItem('lang') || '{}');
    //     return !this.jwtHelper.isTokenExpired(token);
    // }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            localStorage.getItem(constants.TOKEN) &&
            localStorage.getItem(constants.TOKEN) != 'undefined'
        ) {
            return next.handle(request).pipe(
                tap((request: HttpEvent<any>) => {
                    if (request instanceof HttpResponse) {
                        let body = request.body;
                        console.log("body:", body);
                        if (body.code == 200) {
                            // this.authService.checkReFreshToken();
                        }
                        if (body.code == 400 || body.code == 404 ) {
                            if ((body.detailError && body.detailError.includes('Session token is expired')) || (body.detailError && body.detailError.includes('Invalid session token'))) {
                                console.log("Có lỗi: Navigate to Login");
                                // this.toast.error(storage.get('lang') == 'vi' ? 'Đã có lỗi trong quá trình xử lý, vui lòng thực hiện vào lúc khác!' : 'An error occurred during handling data, please try again!', storage.get('lang') == 'vi' ? 'Lỗi' : 'Error', config)
                                this.navigateLogin();
                            }
                        }
                    }
                }),
                finalize(() => {
                    // this.loader.hide();
                }),
                // catchError((err, caught) => {
                //     // let checkErr = false;
                //     // if (checkErr) {
    
                //     // }
                //     console.log(caught)
                //     switch (err.status) {
                //         case 401: //unauthorized
                //             this.router.navigate(['pages/401']);
                //             break;
                //         case 403: //forbidden
                //             this.router.navigate(['pages/403']);
                //             break;
                //         case 404:
                //             // this.router.navigate(['pages/404']);
                //             break;
                //         case 502:
                //         case 503:
                //         case 500:
                //         case 504:
                //         case 0:
                //             this.router.navigate(['pages/500']);
                //     }
                // })
            );
        } else {
            request = request.clone({
                setHeaders: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
              });
            return next.handle(request).pipe(
                finalize(() => {
                //   this.loader.hide();
                })
              );
        }
    }

    private navigateLogin() {
        if(localStorage.getItem(constants.TOKEN)){
        //   this.toast.error(storage.get('lang') == 'vi' ? 'Phiên của bạn đã hết hạn!' : 'Your session has timed-out!', storage.get('lang') == 'vi' ? 'Lỗi' : 'Error', config)
        }

        // handle.logout()
      }
}