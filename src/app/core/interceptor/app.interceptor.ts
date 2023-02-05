import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AppInterceptor implements HttpInterceptor{

    constructor(
        public jwtHelper: JwtHelperService,
    ) { }

    public isAuthenticated(): boolean {
        const token = JSON.parse(localStorage.getItem('lang') || '{}');
        return !this.jwtHelper.isTokenExpired(token);
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(localStorage.getItem('token'));
        return next.handle(request);
    }
}