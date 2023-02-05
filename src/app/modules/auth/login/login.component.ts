import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/service/auth.service';

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
    private authService: AuthService
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

    const body = {
      "Adt": 1,
      "Chd": 1,
      "Inf": 1,
      "ViewMode": "",
      "ListFlight": [{
      "StartPoint": "HAN",
      "EndPoint": "SGN",
      "DepartDate": "17092019",
      "Airline": ""
      }
      ],
      "HeaderUser": "datacom",
      "HeaderPass": "xxxxxxx",
      "ProductKey": "xxxxxxxxxxxx",
      "Language": "vi",
      "AgentAccount": "DC00001",
      "AgentPassword": "xxxxxx"
    }
      
    this.authService.login(body).subscribe(res => {
      console.log(res);
    })
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
      fullname: new FormControl('', {
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

  test() {
    const body = {
      "Adt": 1,
      "Chd": 1,
      "Inf": 1,
      "ViewMode": "",
      "ListFlight": [{
      "StartPoint": "HAN",
      "EndPoint": "SGN",
      "DepartDate": "17092019",
      "Airline": ""
      }
      ],
      "HeaderUser": "datacom",
      "HeaderPass": "xxxxxxx",
      "ProductKey": "xxxxxxxxxxxx",
      "Language": "vi",
      "AgentAccount": "DC00001",
      "AgentPassword": "xxxxxx"
    }
      
    this.authService.login(body).subscribe(res => {
      console.log(res);
    })
  }

}
