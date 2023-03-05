import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { Location } from '@angular/common';
import constants from 'src/app/core/constants/constants';

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
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(''),
        ],
      }),
    });

    this.formRegister = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      fullName: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(''),
        ],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(''),
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
    this.authService.login(body).subscribe(res => {
      if (res.code === 200) {
        // const redirectUrl = this.authService.redirectUrl || '/';
        localStorage.setItem(constants.FULLNAME, res.data.fullName);
        this.location.back();
      }
    })
  }

  register() {
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
