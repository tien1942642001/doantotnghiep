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
  customerId: any = localStorage.getItem(constants.CUSTOMER_ID);
  isSpinning = false;
  pageSize: any = 10;
  pageIndex: any = 0;
  sort: any = 'id,desc';
  listOfDataHotel: any[] = [];
  listOfDataTour: any[] = [];
  totalItemHotel: any;
  totalItemTour: any;

  constructor(
    private route: Router,
    private homeService: HomeService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const formData = this.formMyOrder.value;
      const startTime = formData.rangePicker[0] ? formData.rangePicker[0] : "";
      const endTime = formData.rangePicker[1] ? formData.rangePicker[1] : "";
      const typeOfStatus = formData.typeOfStatus ? formData.typeOfStatus : "";
      const data = {
        customerId: this.customerId,
        status: typeOfStatus,
        startTime: startTime,
        endTime: endTime,
        page: 0,
        size: 10,
        sort: 'id,desc',
      }
      if (formData.typeOfService == "1") {
        this.homeService.searchBookingRoom(data).subscribe(res => {
          if (res.code === 200) {
            this.listOfDataHotel = res.data.content;
            this.totalItemHotel = res.data.totalElements;
          }
        })
      } else if (formData.typeOfService == "3") {
        this.homeService.searchBookingTour(data).subscribe(res => {
          if (res.code === 200) {
            this.listOfDataTour = res.data.content;
            this.totalItemTour = res.data.totalElements;
          }
        })
      }

      this.formMyOrder.valueChanges.subscribe(selectedValue  => {
        let selectStartTime;
        let selectEndTime;
        if (typeof (selectedValue.rangePicker[0]) == "object" && selectedValue.rangePicker[0] != null) {
          selectStartTime = selectedValue.rangePicker[0].getTime();
        }
        if (typeof (selectedValue.rangePicker[1]) == "object" && selectedValue.rangePicker[1] != null) {
          selectEndTime = selectedValue.rangePicker[1].getTime();
        }
        const startTime = selectStartTime ? selectStartTime : "";
        const endTime = selectEndTime ? selectEndTime : "";
        const typeOfStatus = selectedValue.typeOfStatus ? selectedValue.typeOfStatus : "";
        const data = {
          customerId: this.customerId,
          code: selectedValue.code,
          status: typeOfStatus,
          startTime: startTime,
          endTime: endTime,
          page: this.pageIndex,
          size: this.pageSize,
          sort: this.sort,
        }
        if (selectedValue.typeOfService == "1") {
          this.homeService.searchBookingRoom(data).subscribe(res => {
            if (res.code === 200) {
              this.listOfDataHotel = res.data.content;
              this.totalItemHotel = res.data.totalElements;
            }
          })
        } else if (selectedValue.typeOfService == "3") {
          this.homeService.searchBookingTour(data).subscribe(res => {
            if (res.code === 200) {
              this.listOfDataTour = res.data.content;
              this.totalItemTour = res.data.totalElements;
            }
          })
        }
        // else if (formData.typeOfService == 2) {
        //   this.homeService.searchBookingTour(this.customerId, formData.code, formData.typeOfStatus, this.pageSize, this.pageIndex, this.sort).subscribe(res => {
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
    const formData = this.formMyOrder.value;
    let type;
    if (formData.typeOfService == "1") {
      type = "hotel";
    } else if (formData.typeOfService == "3") {
      type = "tour";
    }

    this.route.navigate([`/user/my-order/${id}`], {
      queryParams: {type: type}
    });
  }

  navigateHome() {
    this.route.navigate([`/home`]);
  }

}
