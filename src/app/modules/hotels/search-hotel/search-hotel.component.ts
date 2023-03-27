import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { HomeService } from 'src/app/core/service/home.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  siteId: any;
  routeHotel: any;
  arrivalDate: any;
  leaveDate: any;
  selectedHotel = null;
  currentDate = new Date().getTime();
  hotelList: any[] = [];
  totalHotel: any;
  roomTypeList: any[] = [];
  pageSize: Number = 10;
  pageIndex: Number = 0;
  hotelDetail: any;
  checkActive: boolean = false;
  displayService: boolean = false;
  numberService: any;
  numberRoomType: any;
  serviceDetail: any;
  numberPerson: any;
  nameSite: any;
  allSite: any[] = [];

  noParent: any = 1;
  noChildren: any = 1;

  checkOptionsService: any[] = [
    { value: 1, label: 'Chỉ phòng', checked: true },
    { value: 2, label: 'Ăn sáng', checked: true },
    { value: 3, label: 'Ăn 3 bữa', checked: true },
    { value: 4, label: 'Vui chơi & Giải trí', checked: true },
    { value: 5, label: 'Tặng voucher ẩm thực', checked: true },
  ];

  checkOptionsAccommodation: any[] = [
    { value: 1, label: 'Phòng khách sạn', checked: true },
    { value: 2, label: 'Villa', checked: true },
    { value: 3, label: 'Condotel', checked: true },
  ];

  checkRoomSelect: any;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: true,
  };
  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.homeService.getAllSite().subscribe(res => {
        if (res.code === 200) {
          this.nameSite = res.data.find((item: any) => item.id === this.siteId).name;
        }
      });
      this.siteId = parseInt(params['siteId']);
      this.arrivalDate = params['arrivalDate'];
      this.leaveDate = params['leaveDate'];
      this.noParent = parseInt(params['noParent']);
      this.noChildren = parseInt(params['noChildren']);
      this.getAllHotel(this.siteId);
    })
    this.routeHotel = this.route.snapshot.params['id'];
    if (this.routeHotel) {
      this.checkRoomSelect = true;
      this.numberPerson = this.noParent + this.noChildren;
      this.getAllRoomType(this.routeHotel, this.numberPerson);
      this.homeService.getHotelDetail(this.routeHotel).subscribe(res => {
        if (res.code == 200) {
          this.hotelDetail = res.data;
        }
      })
    }
  }

  handleRoomTypeSelect(data: any) {
    this.router.navigate([`/hotels/search-hotel/${data.id}`], {
      queryParams: {
        siteId: this.siteId,
        noParent: this.noParent,
        noChildren: this.noChildren,
        arrivalDate: this.arrivalDate,
        leaveDate: this.leaveDate,
      }
    })
  }

  getAllHotel(siteId: Number) {
    this.homeService.getAllHotel(this.pageSize, this.pageIndex, siteId).subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.hotelList = res.data.content;
        this.totalHotel = res.data.totalElements;
      }
    });
  }

  getAllRoomType(hotelId: Number, numberPerson: Number) {
    this.homeService.getAllRoomType(this.pageSize, this.pageIndex, hotelId, numberPerson).subscribe(res => {
      if (res.code === 200) {
        this.roomTypeList = [];
        res.data.content.forEach((item: any) => {
          const data = {
            id: item.id,
            name: item.name,
            images: item.images,
            numberPerson: item.numberAdult + item.numberChildren,
            acreage: item.acreage,
            service: item.service,
          }
          this.roomTypeList.push(data);
        })
      }
      console.log(this.roomTypeList);
    });
  }

  formGroup: FormGroup = new FormGroup({
    selectedHotel: new FormControl(),
    rangePicker: new FormControl([this.currentDate, this.currentDate + 86400000 * 2]),
  });

  searchHotels() {
    const formValue = this.formGroup.value;
    this.getAllHotel(formValue.siteId);
  }

  handleCheckFocus(name: any) {
    if (name == "focus") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.add("active");
    }

    if (name == "blur") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.remove("active");
    }
  }

  resetFilter() {
    console.log("reset");
  }

  onChangeService(value: object[]): void {
    console.log(value);
  }

  contents: any[] = [
    {
      id: 1,
      name: "Không bao gồm bữa sáng",
    },
    {
      id: 2,
      name: "Không bao gồm bữa sáng",
    },
    {
      id: 3,
      name: "Không bao gồm bữa sáng",
    },
  ];

  isVisible = false;

  showDetailService() {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  selectRoomType(index: any) {
    this.numberRoomType = index;
    this.numberService = 0;

    const data = {
    }
    this.homeService.saveDataRoom(data);
  }

  selectService(data: any, idx: any) {
    this.serviceDetail = data;
    this.numberService = idx;
  }

  formattedNumber(number: any) {
    return ("0" + number).slice(-2);
  };

  navigateBooking() {
    const customerId = localStorage.getItem(constants.CUSTOMER_ID) || "";
    const data = {
      nameHotel: this.hotelDetail.name,
      nameRoomType: this.roomTypeList[this.numberRoomType].name,
      checkIn: parseInt(this.arrivalDate),
      checkOut: parseInt(this.leaveDate),
      customerId: parseInt(customerId),
      roomTypeId: this.roomTypeList[this.numberRoomType].id,
      serviceId: this.serviceDetail.id,
      hotelId: this.hotelDetail.id,
      numberAdult: this.noParent,
      numberChildren: this.noChildren,
      description: "",
      paymentAmount: this.serviceDetail.price * this.numberPerson,
    }
    this.homeService.saveDataRoom(data);
    this.router.navigate(['/hotels/booking'], {
      queryParams: {type: 'hotel'}
    });
  }

  getDay(miliDate: any) {
    const day = new Date(parseInt(miliDate)).getDay();
    let charDay: Number;
    switch (day) {
      case 0:
        charDay = 1;
        break;
      case 1:
        charDay = 2;
        break;
      case 2:
        charDay = 3;
        break;
      case 3:
        charDay = 4;
        break;
      case 4:
        charDay = 5;
        break;
      case 5:
        charDay = 6;
        break;
      case 6:
        charDay = 7;
        break;
      default:
        charDay = 8;
        break;
    }
    if (charDay == 8) {
      return "Chủ nhật"
    }
    return `Thứ ${charDay}`
  }

}
