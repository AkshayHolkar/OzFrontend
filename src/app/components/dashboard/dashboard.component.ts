import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin = false;

  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserAdmin.subscribe(value => {
      this.isAdmin = value;
    })
  }

  ngOnInit(): void {
  }
}
