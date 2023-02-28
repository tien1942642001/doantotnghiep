import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
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

  hotelDefault: any[] = [
    {
      id: 1,
      name: "Hải Phòng",
      type: "location",
    },
    {
      id: 2,
      name: "Nha Trang",
      type: "location",
    },
    {
      id: 3,
      name: "Hồ Chí Minh",
      type: "location",
    },
    {
      id: 4,
      name: "Hà Nội",
      type: "location",
    },
    {
      id: 5,
      name: "Đà Nẵng",
      type: "location",
    },
    {
      id: 6,
      name: "Hạ Long",
      type: "location",
    },
    {
      id: 7,
      name: "Phú Quốc",
      type: "location",
    },
    {
      id: 8,
      name: "Vinpearl Discovery Golflink Nha Trang",
      type: "hotel",
    },
    {
      id: 9,
      name: "VinHolidays Fiesta Phú Quốc",
      type: "hotel",
    },
    {
      id: 10,
      name: "Vinpearl Resort & Golf Nam Hội An",
      type: "hotel",
    },
    {
      id: 11,
      name: "Vinpearl Resort & Spa Phú Quốc",
      type: "hotel",
    },
    {
      id: 12,
      name: "Vinpearl Condotel Beachfront Nha Trang",
      type: "hotel",
    },
    {
      id: 13,
      name: "Vinpearl Resort & Spa Hạ Long",
      type: "hotel",
    },
    {
      id: 14,
      name: "Vinpearl Resort Nha Trang",
      type: "hotel",
    },
    {
      id: 15,
      name: "Vinpearl Luxury Nha Trang",
      type: "hotel",
    },
    {
      id: 16,
      name: "Vinpearl Discovery Sealink Nha Trang",
      type: "hotel",
    },
    {
      id: 17,
      name: "Vinpearl Resort & Spa Đà Nẵng",
      type: "hotel",
    },
    {
      id: 18,
      name: "VinOasis Phú Quốc",
      type: "hotel",
    },
    {
      id: 19,
      name: "Vinpearl Discovery Wonderworld Phú Quốc",
      type: "hotel",
    },
    {
      id: 20,
      name: "Vinpearl Resort & Spa Hội An",
      type: "hotel",
    },
    {
      id: 21,
      name: "Vinpearl Resort & Spa Nha Trang Bay",
      type: "hotel",
    },
  ];

  roomList: any[] = [
    {
      id: 1,
      noPeopel: 1,
      noChildren: 1,
    },
  ];
  noPeopel: any = 1;
  noChildren: any = 1;

  onIncreaseRoom(idx: Number) {
    if (idx == 0) {
      this.roomList[0].noChildren
    }
    let count = this.roomList.length;
    this.roomList.push(count + 1);
  }

  onIncreasePeople() {
    this.noPeopel++;
  }

  onIncreaseChildren() {
    this.noChildren++;
  }

  onDecreaseRoom() {
    this.roomList.pop();
  }

  onDecreasePeople() {
    this.noPeopel--;
  }

  onDecreaseChildren() {
    this.noChildren--;
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
    }
    if (this.router.url.includes("home")) {
      this.router.navigate(['/hotels/booking-search'], {
        queryParams: data
      });
    } else {
      
    }
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
