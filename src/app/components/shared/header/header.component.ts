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

  constructor(private router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isLogin = value;
    });
    this.dataSharingService.isUserInRegistrationProccess.subscribe(value => {
      this.isInRegistrationProcess = value;
    });
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.dataSharingService.isUserLoggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
