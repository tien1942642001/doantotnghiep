import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzSelectPlacementType } from 'ng-zorro-antd/select';
import constants from 'src/app/core/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderComponent implements OnInit {
  nav_list: any;
  showDropMoney: Boolean = false;
  showDropLanguage: Boolean = false;
  selectedHotel = null;
  placementSelect: NzSelectPlacementType = 'bottomLeft';
  currentDate = new Date().getTime();
  currentLang = localStorage.getItem("lang");
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
  bookingTypes: any[] = [
    {
      id: 1,
      name: "Khách sạn & Nghỉ dưỡng",
      icon: "icon_hotel_w",
      iconActive: "icon_hotel_y",
    },
    // {
    //   id: 2,
    //   name: "Vé máy bay",
    //   icon: "icon_flight_w",
    //   iconActive: "icon_flight_y",
    // },
    {
      id: 3,
      name: "Khách sạn + Vé máy bay",
      icon: "icon_hotel_flight_w",
      iconActive: "icon_hotel_flight_y",
    },
    {
      id: 4,
      name: "Tour & Trải nghiệm",
      icon: "icon_tour_w",
      iconActive: "icon_tour_y",
    },
  ];

  fullName: any;

  handleOk() {
    console.log(123);
  }

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

  formGroup: FormGroup = new FormGroup({
    selectedHotel: new FormControl(),
    rangePicker: new FormControl([this.currentDate, this.currentDate + 86400000 * 2]),
  });

  formTour: FormGroup = new FormGroup({
    searchName: new FormControl(),
    selectedHotel: new FormControl(),
  });

  constructor(
    private _el: ElementRef,
    private route: Router,
  ) { }

  onClick(event: { target: any; }) {
    // console.log(event.target);
    if (!document.getElementById("money-name")?.contains(event.target)) {
      this.showDropMoney = false;
    }

    if (!document.getElementById("language-name")?.contains(event.target)) {
      this.showDropLanguage = false;
    }
  }

  ngOnInit(): void {
    this.nav_list = [
      {
        name: "Đặt dịch vụ",
        child: [
          "Khách sạn",
          "Vé máy bay",
          "Khách sạn + Vé máy bay",
          "Tour & Trải nghiệm"
        ],
        navigate: "",
      },
      {
        name: "Trải nghiệm Vinpearl",
        child: [
          "Quần thể",
          "Khách sạn",
          "VinWonders",
          "Vinpearl Golf",
          "Vinpearl Safari",
          "Ẩm thực",
          "Hội họp và Sự kiện",
          "Grand World"
        ],
        navigate: "",
    },
    {
      name: "Ưu đã khuyến mại",
      child: [
        "Ưu đã nổi bật",
        "Ưu đãi Pearl Club"
      ],
      navigate: "",
    },
    {
      name: "Blog",
      navigate: "post/post-list",
    }
    ];

    this.fullName = localStorage.getItem(constants.FULLNAME);
  }

  handleShowDrop(name: any) {
    if (name == "money") {
      this.showDropMoney = !this.showDropMoney;
    }
    if (name == "language") {
      this.showDropLanguage = !this.showDropLanguage;
    }
  }

  searchBooking () {
    console.log(this.formGroup.controls['rangePicker'].value[0].getTime());
    console.log(this.formGroup.value);
  }

  handleCheckFocus(name: any) {
    if (name == "focus") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.add("active");
    }

    if (name == "blur") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.remove("active");
    }
  }

  navigateToHome() {
    this.route.navigate(['/home']);
  }

  changeLanguage(lang: any) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  navigateUserProfile(flat: number) {
    if (flat === 1) {
      this.route.navigate(["/user/user-profile"])
    }
    if (flat === 2) {
      this.route.navigate(["/user/my-order"])
    }
    if (flat === 3) {
      this.route.navigate(["/post/new-post"])
    }
    if (flat === 4) {
      this.route.navigate(["/user/my-post"])
    }
    if (flat === 5) {
      this.fullName = null;
      localStorage.clear();
      this.route.navigate(["/home"])
    }
  }

}
