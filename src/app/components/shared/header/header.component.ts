import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  isInRegistrationProcess: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isLogin = value;
    });
    this.dataSharingService.isUserInRegistrationProccess.subscribe(value => {
      this.isInRegistrationProcess = value;
    });
    this.dataSharingService.isUserAdmin.subscribe(value => {
      this.isAdmin = value;
    });
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.dataSharingService.isUserLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/user/login']);
  }
}
