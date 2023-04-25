import { Component, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import { HomeService } from 'src/app/core/service/home.service';
import { AuthService } from 'src/app/core/service/auth.service';
import constants from 'src/app/core/constants/constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  currentTab = 1;
  disable = false;
  inputValue?: string;
  detailRoom: any;
  detailTour: any;
  detailBookingRoom: any;
  detailBookingTour: any;
  subscription!: Subscription;
  paymentStatus: any;
  paymentCode: any;
  customerId: any;
  typeBooking: any;
  numberDay: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private homeService: HomeService,
    private authService: AuthService,
    private el: ElementRef,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.typeBooking = params['type'];
      this.paymentStatus = params['vnp_ResponseCode'];
      this.paymentCode = params['vnp_TxnRef'];
      if (this.typeBooking == "hotel") {
        this.subscription = this.homeService.dataRoom.subscribe((data: any) => {
          if (data) {
            this.detailRoom = data;
          } else {
            this.location.back();
          }
        })
      } else if (this.typeBooking == "tour") {
        this.subscription = this.homeService.dataTour.subscribe((data: any) => {
          if (data) {
            this.detailTour = data;
          } else {
            this.location.back();
          }
        })
      }
      // vnp_TxnRef=Hotelf98b537e1cc6475a8d6495e3d91bf6be
      if (this.paymentStatus) {
        this.currentTab = 2;
        if (this.paymentCode.includes("Hotel")) {
          this.homeService.getBookingRoomByPaymentCode(this.paymentCode).subscribe(res => {
            if (res.code === 200) {
              const data = res.data;
              this.detailBookingRoom = data;
              if (this.paymentStatus == "00") {
                this.homeService.checkBookingRoomOk(this.paymentCode, data.id).subscribe(res => {
                  this.detailBookingRoom.paymentStatus = 1;
                })
              }
            }
          })
        } else if (this.paymentCode.includes("Tour")) {
          this.homeService.getBookingTourByPaymentCode(this.paymentCode).subscribe(res => {
            if (res.code === 200) {
              const data = res.data;
              this.detailBookingTour = data;
              this.numberDay = Math.round((new Date(res.data?.tour.startDate).getTime() - new Date(res.data?.paymentDate).getTime())/ 86400000);
              if (this.paymentStatus == "00") {
                this.homeService.checkBookingTourOk(this.paymentCode, data.id).subscribe(res => {
                  this.detailBookingTour.paymentStatus = 1;
                })
              }
            }
          })
        } else if (this.paymentStatus == "24") {
          alert("Hủy đơn hàng thành công!");
        }
      }
    })

    this.customerId = localStorage.getItem(constants.CUSTOMER_ID);
    if (!this.customerId) {
      this.router.navigate(['/auth/login']);
    }
    this.authService.detail(this.customerId).subscribe((res => {
      if (res.code === 200) {
        const data = res.data;
        this.formHotel.patchValue({
          name: data.fullName,
          gender: String(data.sex),
          email: data.email,
          phone: data.phone,
          nationality: data.nationality,
          checkResident: true,
        })
      }
    }))
  }

  formHotel: FormGroup = new FormGroup({
    gender: new FormControl('3', {
      validators: [
        Validators.required,
      ],
    }),
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(REGEX_PATTERN.EMAIL),
      ],
    }),
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(REGEX_PATTERN.PHONE),
      ],
    }),
    nationality: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    checkResident: new FormControl(true),
    payment: new FormControl('4', ),
    textarea: new FormControl(''),
  })

  selectRoomAgagin() {
    this.location.back();
  }

  navigateHome() {
    this.router.navigate(["/home"]);
  }

  log(value: string[]): void {
    console.log(value);
    this.detailRoom.description = value.join(", ");
  }

  submitForm() {
    if (this.formHotel.invalid) {
      for (const control of Object.keys(this.formHotel.controls)) {
        this.formHotel.controls[control].markAsTouched();
        if (this.formHotel.controls[control].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + control + '"]');
          invalidControl.focus();
          break;
       }
      }
      return;
    }
    const formValue = this.formHotel.value;
    const data = {
      fullName:  formValue.name,
      phone:  formValue.phone,
      email:  formValue.email,
      sex:  formValue.gender,
      nationality:  formValue.nationality,
    }
    this.authService.update(this.customerId, data).subscribe(res => {
      if (res.code === 200) {
        // this.toast.success()
      }
    })

    if (this.typeBooking == "hotel") {
      // this.detailRoom.description = "Đặt hàng tại Vinpearl";
      if (this.formHotel.value.textarea) {
        this.detailRoom.description += ", " + this.formHotel.value.textarea;
      }
      console.log(this.detailRoom);
      this.detailRoom.customerId = this.customerId;
      this.homeService.bookingRoom(this.detailRoom).subscribe({
        next: res => {
          this.detailRoom = res;
          window.location.href = res.data.url;
        },
        error: error => {
          if (error) {

          }
        }
      })
    } else if (this.typeBooking == "tour") {
      this.detailTour.description = "Đặt hàng tại Vinpearl ...";
      this.homeService.bookingTour(this.detailTour).subscribe({
        next: res => {
          this.detailTour = res;
          window.location.href = res.data.url;
        },
        error: error => {
          if (error.error.detailError.includes("Phòng trong khách sạn đã hết, vui lòng chọn khách sạn khác")) {
            // this.toast.error("Phòng trong khách sạn đã hết, vui lòng chọn khách sạn khác", "Thông báo");
            alert("Phòng trong khách sạn đã hết, vui lòng chọn khách sạn khác");
            setTimeout(() => {
              this.location.back();
            }, 3000);
          }
        }
      })
    }
  }

}
