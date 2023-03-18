import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import { HomeService } from 'src/app/core/service/home.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.homeService.dataRoom.subscribe((data: any) => {
      if (data) {
        this.detailRoom = data;
      } else {
        this.location.back();
      }
    })
    this.route.queryParams.subscribe((item) => {
      console.log(item);
      this.paymentStatus = item['vnp_ResponseCode'];
      console.log(this.paymentStatus);
      if (this.paymentStatus == "00") {
        this.homeService.checkBookingRoomOk(this.detailRoom.id, this.detailRoom).subscribe(res => {
          console.log(res);
          if (res.code === 200) {

          }
        })
        this.currentTab = 2;
      } else if (this.paymentStatus == "24") {
        console.log(this.paymentStatus);
      }
    })
  }

  validateForm: FormGroup = new FormGroup({
    gender: new FormControl('', {
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
    checkResident: new FormControl(),
    payment: new FormControl(),
    textarea: new FormControl(''),
  })

  selectRoomAgagin() {
    this.location.back();
  }

  log(value: string[]): void {
    console.log(value);
  }

  submitFormRoom() {
    this.detailRoom.description = "Đặt hàng tại ABC";
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
  }

  submitFormTour() {
    const formValue = this.validateForm.value;
    this.homeService.bookingRoom(this.detailRoom).subscribe({
      next: res => {
        this.detailRoom = res;
        window.location.href = res.data.url;
      },
      error: error => {
        console.log(error);
      }
    })
    // this.homeService.bookingRoom(this.detailRoom).subscribe(res => {
    //   if (res.code === 200) {
    //     window.location.href = res.data;
    //   }
    // }, (err) => {
    //   console.log(err);
    // })
  }

}
