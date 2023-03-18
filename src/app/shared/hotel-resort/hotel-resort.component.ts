import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import handle from 'src/app/core/functions/handle';
import { HomeService } from 'src/app/core/service/home.service';
@Component({
  selector: 'app-hotel-resort',
  templateUrl: './hotel-resort.component.html',
  styleUrls: ['./hotel-resort.component.scss']
})
export class HotelResortComponent implements OnInit {

  siteId: any;
  arrivalDate: any;
  leaveDate: any;
  locationPlaceHolder: string = "";
  listOfSite: any[] = [];
  hotelDefault: any[] = [];

  noParent: any = 1;
  noChildren: any = 1;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private homeService: HomeService,
    // private toast: Toastr,
  ) { }

  formHotel: FormGroup = new FormGroup({
    siteId: new FormControl(""),
    rangePicker: new FormControl([new Date(), new Date().setDate(new Date().getDate() + 2)]),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.siteId = parseInt(params['siteId']);
      this.arrivalDate = parseInt(params['arrivalDate']);
      this.leaveDate = parseInt(params['leaveDate']);
      this.noChildren = params['noChildren'] ? parseInt(params['noChildren']) : 1;
      this.noParent = params['noParent'] ? parseInt(params['noParent']) : 1;
    })

    this.getAllSite();
    
    if (!this.router.url.includes("home")) {
      this.formHotel.controls['siteId'].setValue(this.siteId);
      this.formHotel.controls['rangePicker'].setValue([this.arrivalDate, this.leaveDate]);
    }
  }

  getAllSite() {
    this.homeService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      } else {
        // this.toast
        handle.logout();
      }
    });
  }


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime();
  };

  // disabledDateTime:() => DisabledTimeFn = () => (_value) => ({
  //   nzDisabledHours: () => {
  //     if (_value != null) {
  //       const month = new Date(_value.toString()).getMonth();
  //       const date = new Date(_value.toString()).getDate();
  //       if (month < new Date().getMonth()) {
  //         return []
  //       }
  //       if (date < new Date().getDate()) {
  //         return []
  //       }
  //     }
  //     const currentHours = new Date().getHours();
  //     return this.range(currentHours + 1, 24)
  //   },

  //   nzDisabledMinutes: () => {
  //     if (_value != null) {
  //       const month = new Date(_value.toString()).getMonth();
  //       const date = new Date(_value.toString()).getDate();
  //       const hours = new Date(_value.toString()).getHours();
  //       if (month < new Date().getMonth()) {
  //         return []
  //       }
  //       if (date < new Date().getDate()) {
  //         return []
  //       }
  //       if (hours < new Date().getHours()) {
  //         return []
  //       }
  //     }
  //     const currentMinutes = new Date().getMinutes()
  //     return this.range(currentMinutes + 1, 60)
  //   },
  //   nzDisabledSeconds: () => {
  //     if (_value != null) {
  //       const month = new Date(_value.toString()).getMonth();
  //       const date = new Date(_value.toString()).getDate();
  //       const hours = new Date(_value.toString()).getHours();
  //       const minutes = new Date(_value.toString()).getMinutes();
  //       if (month < new Date().getMonth()) {
  //         return []
  //       }
  //       if (date < new Date().getDate()) {
  //         return []
  //       }
  //       if (hours < new Date().getHours()) {
  //         return []
  //       }
  //       if (minutes < new Date().getMinutes()) {
  //         return []
  //       }
  //     }
  //     const currentSecond = new Date().getSeconds()
  //     return this.range(currentSecond + 1, 60)
  //   },
  // });

  onIncrease(index: any) {
    if (index == 1) {
      this.noParent++;
    } else {
      this.noChildren++;
    }
  }

  onDecrease(index: any) {
    if (index == 1) {
      this.noParent--;
    } else {
      this.noChildren--;
    }
  }

  handleOk() {
    console.log(123);
  }

  searchHotels () {
    const formValue = this.formHotel.value;
    console.log(formValue);
    if (typeof (formValue.rangePicker[0]) === 'object') {
      formValue.rangePicker[0] = formValue.rangePicker[0].getTime();
    }
    if (typeof (formValue.rangePicker[1]) === 'object') {
      formValue.rangePicker[1] = formValue.rangePicker[1].getTime();
    }
    const data = {
      siteId: formValue.siteId,
      arrivalDate: formValue.rangePicker[0],
      leaveDate: formValue.rangePicker[1],
      noParent: this.noParent,
      noChildren: this.noChildren,
    }
    // if (this.router.url.includes("home")) {
    //   this.router.navigate(['/hotels/search-hotel'], {
    //     queryParams: data
    //   });
    // } else {
      
    // }
    this.router.navigate(['/hotels/search-hotel'], {
      queryParams: data
    });
  }

  handleCheckFocus(name: any) {
    if (name == "focus") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.add("active");
    }

    if (name == "blur") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.remove("active");
    }
  }
}
