import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import handle from 'src/app/core/functions/handle';
import { AuthService } from 'src/app/core/service/auth.service';
import { HomeService } from 'src/app/core/service/home.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
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

  ngOnInit(): void {
    const formData = this.formMyOrder.value;
      const startTime = formData.rangePicker[0] ? formData.rangePicker[0] : "";
      const endTime = formData.rangePicker[0] ? formData.rangePicker[0] : "";
      if (formData.typeOfService == "1") {
        this.homeService.searchBookingRoom(this.customerId, formData.code, formData.typeOfStatus, startTime, endTime, this.pageSize, this.pageIndex).subscribe(res => {
          if (res.code === 200) {
            this.listOfData = res.data.content;
          }
        })
      } else if (formData.typeOfService == "3") {
        this.homeService.searchBookingTour(this.customerId, formData.code, formData.typeOfStatus, startTime, endTime, this.pageSize, this.pageIndex).subscribe(res => {
          if (res.code === 200) {
            this.listOfData = res.data.content;
          }
        })
      } 

      this.formMyOrder.valueChanges.subscribe(selectedValue  => {
        const startTime = selectedValue.rangePicker[0] ? selectedValue.rangePicker[0] : "";
        const endTime = selectedValue.rangePicker[0] ? selectedValue.rangePicker[0] : "";
        if (selectedValue.typeOfService == "1") {
          this.homeService.searchBookingRoom(this.customerId, selectedValue.code, selectedValue.typeOfStatus, startTime, endTime, this.pageSize, this.pageIndex).subscribe(res => {
            if (res.code === 200) {
              this.listOfData = res.data.content;
            }
          })
        } else if (selectedValue.typeOfService == "3") {
          this.homeService.searchBookingTour(this.customerId, selectedValue.code, selectedValue.typeOfStatus, startTime, endTime, this.pageSize, this.pageIndex).subscribe(res => {
            if (res.code === 200) {
              this.listOfData = res.data.content;
            }
          })
        }
        // else if (formData.typeOfService == 2) {
        //   this.homeService.searchBookingTour(this.customerId, formData.code, formData.typeOfStatus, this.pageSize, this.pageIndex).subscribe(res => {
        //     if (res.code === 200) {
        //       this.listOfData = res.data.content;
        //     }
        //   })
        // }
      })
  }

  formMyOrder: FormGroup = new FormGroup({
    code: new FormControl('', ),
    rangePicker: new FormControl([], ),
    typeOfService: new FormControl('1', ),
    typeOfStatus: new FormControl('1', ),
  })

  navigateOderDetail(id: any) {
    this.route.navigate([`/user/my-order/${id}`]);
  }

}
