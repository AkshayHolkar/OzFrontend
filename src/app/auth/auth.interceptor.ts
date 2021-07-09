import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IRefreshTokenRequest } from "../models/refreshTokenRequest";
import { DataSharingService } from "../service/data-sharing.service";
import { UserService } from "../service/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private dataSharingService: DataSharingService, private userService: UserService) { }

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
              let params: IRefreshTokenRequest = {
                token: localStorage.getItem('token') || '',
                refreshToken: localStorage.getItem('refreshToken') || ''
              };
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              this.userService.refresh(params).subscribe(
                (res: any) => {
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('refreshToken', res.refreshToken);
                },
                error => {
                  this.dataSharingService.isUserLoggedIn.next(false);
                  this.router.navigateByUrl('/user/login');
                }
              );
            }
          }
        )
      )
    } else {
      return next.handle(req.clone());
    }
  }
}
