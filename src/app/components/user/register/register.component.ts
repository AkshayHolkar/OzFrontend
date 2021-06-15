import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });

  comparePasswords(fb: FormGroup) {
    let confirmP = fb.get('ConfirmPassword');

    if (confirmP?.errors == null || 'passwordMissMatch' in confirmP.errors) {
      if (fb.get('Password')?.value != confirmP?.value) {
        confirmP?.setErrors({ passwordMissMatch: true });
      } else {
        confirmP?.setErrors(null);
      }
    }
  }

  isFail = false;

  constructor(public service: UserService, private router: Router, private fb: FormBuilder, private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.register(this.registerForm.value).subscribe(
      (res: any) => {
        this.dataSharingService.isUserLoggedIn.next(true);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl("/user/account");
      },
      err => {
        if (err.status == 400) {
          this.isFail = true;
        }
      }
    );
  }
}
