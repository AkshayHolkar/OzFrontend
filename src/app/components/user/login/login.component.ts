import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private service: UserService, private router: Router, private fb: FormBuilder, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.dataSharingService.isUserLoggedIn.next(true);
        localStorage.setItem('token', res.token);
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
}
