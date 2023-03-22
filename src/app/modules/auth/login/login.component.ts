import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { Location } from '@angular/common';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentTab: number = 1;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  formRegister: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { 
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translate.use('vi');
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formLogin = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(REGEX_PATTERN.EMAIL),
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),
    });

    this.formRegister = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern(REGEX_PATTERN.EMAIL),
        ]
      }),
      fullName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(100),
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),
    })
  }

  clickTab(tab: number) {
    this.currentTab = tab;
    const listNav = document.querySelectorAll('.nav__item');
    listNav.forEach((el) => {
      el.classList.remove('active');
    })
    document.getElementById(`nav__item__${tab}`)?.classList.add('active');
    this.formLogin.reset();
    this.formLogin.reset();
  }

  login() {
    const body = this.formLogin.value;
    var email = body.email;
    var password = body.password;
    var remember = body.remember;
    if (this.formLogin.invalid) {
      for (const control of Object.keys(this.formLogin.controls)) {
        this.formLogin.controls[control].markAsTouched();
      }
      return;
    }
    if (remember) {
      localStorage.setItem(constants.REMEMBER_ME, 'true');
      localStorage.setItem(constants.EMAIL_REMEMBER, email);
      localStorage.setItem(constants.PASSWORD_REMEMBER, btoa(password));
    } else {
      if (localStorage.getItem(constants.EMAIL_REMEMBER) && email != localStorage.getItem(constants.EMAIL_REMEMBER)) {
        localStorage.setItem(constants.REMEMBER_ME, 'true');
      } else {
        localStorage.setItem(constants.REMEMBER_ME, 'false');
      }
    }
    this.authService.login(email, password).subscribe(res => {
      if (res.code === 200) {
        // const redirectUrl = this.authService.redirectUrl || '/';
        localStorage.setItem(constants.FULLNAME, res.data.fullName);
        localStorage.setItem(constants.TOKEN, res.data.token);
        localStorage.setItem(constants.CUSTOMER_ID, res.data.id);
        this.location.back();
      }
    })
  }

  register() {
    if (this.formRegister.invalid) {
      for (const control of Object.keys(this.formRegister.controls)) {
        this.formRegister.controls[control].markAsTouched();
      }
      return;
    }
    const formValue = this.formRegister.value;
    const body = {
      fullName: formValue.fullName,
      email: formValue.email,
      password: formValue.password,
    }
    this.authService.register(body).subscribe(res => {
      if (res.code === 200) {
        this.clickTab(1);
      }
    })
  }

}
