import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import handle from 'src/app/core/functions/handle';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUrl: any;
  fullName: any;
  isSpinning = false;
  constructor(
    private route: Router,
  ) { }

  formUserProfile: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    sex: new FormControl('2', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_PATTERN.PHONE),
    ]),
    address: new FormControl(''),
    cccd: new FormControl('', Validators.required),
    typeOfCccd: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    nationality: new FormControl(null, Validators.required),
    createdDateCccd: new FormControl(null, Validators.required),
    expiredDateCccd: new FormControl(null, Validators.required),
  })

  formMyOrder: FormGroup = new FormGroup({
    code: new FormControl('', ),
    rangePicker: new FormControl('', ),
    typeofService: new FormControl('', ),
    typeOfStatus: new FormControl('', ),
  })

  ngOnInit(): void {
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);
    this.fullName = localStorage.getItem(constants.FULLNAME);
  }

  navigateUserProfile(flat: number) {
    if (flat === 1) {
      this.route.navigate(["/user/user-profile"])
    }
    if (flat === 2) {
      this.route.navigate(["/user/my-order"])
    }
    if (flat === 5) {
      handle.logout();
    }
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  submitForm() {

  }

  handleOk() {
    console.log(123);
  }

}
