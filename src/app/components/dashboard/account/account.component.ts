import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountForm = new FormGroup({
    contactName: new FormControl('', Validators.required),
    businessName: new FormControl('', Validators.required),
    abn: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    country: new FormControl('')
  });

  account: IAccount = { userId: '',
    contactName: '',
    businessName: '',
    abn: 0,
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postcode: 0,
    country: 'Australia'
  };
  isNewUser = false;
  isFail = false;
  isSuccess = false;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.accountService.getaccount().subscribe(
      (account) => {
        if (account == null) {
          this.isNewUser = true;
        } else {
          this.account = account;
          this.accountForm.controls.contactName.setValue(this.account.contactName);
          this.accountForm.controls.businessName.setValue(this.account.businessName);
          this.accountForm.controls.abn.setValue(this.account.abn);
          this.accountForm.controls.phone.setValue(this.account.phone);
          this.accountForm.controls.streetAddress.setValue(this.account.streetAddress);
          this.accountForm.controls.city.setValue(this.account.city);
          this.accountForm.controls.state.setValue(this.account.state);
          this.accountForm.controls.postcode.setValue(this.account.postcode);
          this.accountForm.controls.country.setValue(this.account.country);
          console.log(this.account);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    this.account.contactName = this.accountForm.controls.contactName.value;
    this.account.businessName = this.accountForm.controls.businessName.value;
    this.account.abn = this.accountForm.controls.abn.value;
    this.account.phone = this.accountForm.controls.phone.value;
    this.account.streetAddress = this.accountForm.controls.streetAddress.value;
    this.account.city = this.accountForm.controls.city.value;
    this.account.state = this.accountForm.controls.state.value;
    this.account.postcode = this.accountForm.controls.postcode.value;
    this.account.country = this.accountForm.controls.country.value;


    if (this.isNewUser) {
      this.accountService.addAccount(this.account).subscribe(
        (res: any) => {
          this.router.navigateByUrl("products");
        },
        err => {
          if (err.status == 400) {
            this.isFail = true;
          } else {
            console.log(err);
          }
        }
      );
    } else {
      this.accountService.updateAccount(this.account.userId, this.account).subscribe(
        (res: any) => { 
          this.isSuccess = true;
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
  }
}
