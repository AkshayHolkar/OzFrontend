import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  accounts: IAccount[] = [];
  selectedOption = '';
  isSuccess = false;

  constructor(private accountService: AccountService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts(false).subscribe(
      (accounts) => {
        this.accounts = accounts;
        console.log(accounts);
      },
      error => {
        console.log(error);
      }
    )
  }

  accountDetail(account: IAccount) {
    this.router.navigateByUrl('user/customerDetail', { state: account });
  }

  onSubmit(account: IAccount) {
    account.approved = true;

    this.userService.approve(account.userId).subscribe(
      success => {
        this.updateAccount(account);
      },
      error => {
        console.error();
      }
    );
  }

  updateAccount(account: IAccount) {
    this.accountService.updateAccount(account.userId, account).subscribe(
      success => {
        this.isSuccess = true;
      },
      error => {
        console.error();
      }
    );
  }
}
