import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { DataSharingService } from "../service/data-sharing.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private dataSharingService: DataSharingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    success => { },
                    error => {
                        if (error.status == 401) {
                            this.dataSharingService.isUserLoggedIn.next(false);
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }
                    }
                )
            )
        } else {
            return next.handle(req.clone());
        }
    }
}
