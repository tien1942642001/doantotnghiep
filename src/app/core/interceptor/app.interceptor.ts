import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../service/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor{

    constructor(
        public jwtHelper: JwtHelperService,
        public authService: AuthService
    ) { }

    public isAuthenticated(): boolean {
        const token = JSON.parse(localStorage.getItem('lang') || '{}');
        return !this.jwtHelper.isTokenExpired(token);
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log(localStorage.getItem('token'));
        return next.handle(request).pipe(
            tap((request: HttpEvent<any>) => {
                if (request instanceof HttpRequest) {
                    let body = request.body;
                    console.log("body: " , body);
                    if (body.code == 200) {
                        // this.authService.checkReFreshToken();
                    }
                    if (body.code == 400 || body.code == 401 ) {
                        if ((body.detailError && body.detailError.includes('Session token is expired')) || (body.detailError && body.detailError.includes('Invalid session token'))) {
                            console.log("Có lỗi: Navigate to Login");
                        }
                    }
                }
            })
        );
    }
}