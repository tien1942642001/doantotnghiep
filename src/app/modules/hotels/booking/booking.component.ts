import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import { HomeService } from 'src/app/core/service/home.service';
import { AuthService } from 'src/app/core/service/auth.service';
import constants from 'src/app/core/constants/constants';

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
  subscription!: Subscription;
  paymentStatus: any;
  paymentCode: any;
  customerId: any;
  typeBooking: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private homeService: HomeService,
    private authService: AuthService,
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
      if (this.paymentStatus) {
        if (this.paymentStatus == "00") {
          this.homeService.getBookingRoomByPaymentCode(this.paymentCode).subscribe(res => {
            if (res.code === 200) {
              const data = res.data;
              this.homeService.checkBookingRoomOk(data.id, data).subscribe(res => {
                console.log(res);
                if (res.code === 200) {
                  
                }
              })
            }
          })
          this.currentTab = 2;
        } else if (this.paymentStatus == "24") {
          alert("Hủy đơn hàng thành công!");
          this.currentTab = 2;
          this.homeService.getBookingRoomByPaymentCode(this.paymentCode).subscribe(res => {
            if (res.code === 200) {
              // this.homeService.checkBookingRoomOk(data.id, data).subscribe(res => {
              //   console.log(res);
              //   if (res.code === 200) {
                  
              //   }
              // })
            }
          })
        }
      }
    })

    this.customerId = localStorage.getItem(constants.CUSTOMER_ID);
    this.authService.detail(this.customerId).subscribe((res => {
      if (res.code === 200) {
        const data = res.data;
        this.formHotel.patchValue({
          name: data.fullName,
          gender: String(data.sex),
          email: data.email,
          phone: data.phone,
          nationality: "Việt Nam",
          checkResident: true,
        })
      }
    }))
  }

  formHotel: FormGroup = new FormGroup({
    gender: new FormControl('3', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
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
        Validators.maxLength(255),
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

  log(value: string[]): void {
    console.log(value);
  }

  submitForm() {
    if (this.typeBooking == "hotel") {
      this.detailRoom.description = "Đặt hàng tại Vinpearl";
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
          console.log(error);
        }
      })
    }
  }

}
