import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRefreshTokenRequest } from 'src/app/models/refreshTokenRequest';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  isFail = false;
  roles: Array<string> = [];

  constructor(private service: UserService, private router: Router, private fb: FormBuilder, private dataSharingService: DataSharingService, private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('refreshToken') != null) {
      this.loginWithRefreshmentToken();
    }
  }

  loginWithRefreshmentToken() {
    let params: IRefreshTokenRequest = {
      token: localStorage.getItem('token') || '',
      refreshToken: localStorage.getItem('refreshToken') || ''
    };
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.userService.refresh(params).subscribe(
      (res: any) => {
        this.dataSharingService.isUserLoggedIn.next(true);
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.GetUserRoles(res.token);
        this.router.navigate(["products"]);
      },
      error => {
        this.dataSharingService.isUserLoggedIn.next(false);
        this.router.navigateByUrl('/user/login');
      }
    );
  }

  onSubmit() {

    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.dataSharingService.isUserLoggedIn.next(true);
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.GetUserRoles(res.token);
        this.router.navigate(["products"]);
      },
      err => {
        if (err.status == 400) {
          this.isFail = true;
        } else {
          console.log(err);
        }
      }
    );
  }

  GetUserRoles(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    this.roles = JSON.parse(jsonPayload).role;
    this.dataSharingService.isUserApproved.next(this.roles.includes('Approved'));
    this.dataSharingService.isUserAdmin.next(this.roles.includes('Admin'));
  };
}
