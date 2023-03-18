import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import handle from 'src/app/core/functions/handle';
import { AuthService } from 'src/app/core/service/auth.service';
import { HomeService } from 'src/app/core/service/home.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUrl: any;
  fullName: any;
  customerId: any;
  isSpinning = false;
  pageSize: any = 10;
  pageIndex: any = 0;
  listOfData: any[] = [];
  constructor(
    private route: Router,
    private homeService: HomeService,
    private authService: AuthService,
  ) { }

  formUserProfile: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    sex: new FormControl('2', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_PATTERN.PHONE),
    ]),
    // address: new FormControl(''),
    cccd: new FormControl('', Validators.required),
    typeOfCccd: new FormControl('cmnd', Validators.required),
    birthDate: new FormControl('', Validators.required),
    nationality: new FormControl(null, Validators.required),
    createdDateCccd: new FormControl(null, Validators.required),
    expiredDateCccd: new FormControl(null, Validators.required),
  })

  

  ngOnInit(): void {
    this.currentUrl = this.route.url;
    this.fullName = localStorage.getItem(constants.FULLNAME);
    this.customerId = localStorage.getItem(constants.CUSTOMER_ID);
  }

  navigateUserProfile(flat: number) {
    if (flat === 1) {
      this.route.navigate(["/user/user-profile"])
    }
    if (flat === 2) {
      this.route.navigate(["/user/my-order"])
    }
    if (flat === 3) {
      this.route.navigate(["/user/my-post"])
    }
    if (flat === 4) {
      handle.logout();
    }
  }
}
