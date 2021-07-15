import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  accounts: IAccount[] = [];
  customerId = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts(false).subscribe(
      (accounts) => {
        this.accounts = accounts;
      },
      error => {
        console.log(error);
      }
    )
  }

  setCustomerId(userId: string): void {
    this.customerId = userId;
  }
}
