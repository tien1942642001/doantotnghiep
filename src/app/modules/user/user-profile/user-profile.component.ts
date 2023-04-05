import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import handle from 'src/app/core/functions/handle';
import { AuthService } from 'src/app/core/service/auth.service';
import { HomeService } from 'src/app/core/service/home.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
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
    private toastService: ToastrService,
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
    typeOfCccd: new FormControl('cmnd', Validators.required),
    birthDate: new FormControl('', Validators.required),
    nationality: new FormControl(null, Validators.required),
    createdDateCccd: new FormControl(null, Validators.required),
    expiredDateCccd: new FormControl(null, Validators.required),
  })



  ngOnInit(): void {
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);
    this.fullName = localStorage.getItem(constants.FULLNAME);
    this.customerId = localStorage.getItem(constants.CUSTOMER_ID);
    this.authService.detail(this.customerId).subscribe((res => {
      if (res.code === 200) {
        const data = res.data;
        this.formUserProfile.setValue({
          fullName: data.fullName,
          sex: String(data.sex),
          email: data.email,
          phone: data.phone,
          address: "Việt Nam",
          cccd: data.cccd,
          typeOfCccd: data.cccd,
          birthDate: data.birthDate,
          nationality: data.nationality,
          createdDateCccd: data.createdDateCccd,
          expiredDateCccd: data.expiredDateCccd,
        })
      }
    }))
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  submitForm() {

  }

  handleOk() {
    console.log(123);
  }


  updateCustomer() {
    const formValue = this.formUserProfile.value;
    this.authService.update(this.customerId, formValue).subscribe(res => {
      if (res.code === 200) {
        // this.toast.success()
        localStorage.setItem(constants.FULLNAME, formValue.fullName);
        this.toastService.success("Cập nhật thông tin thành công", "Thành công");
        window.location.reload();
      }
    })
  }

}
