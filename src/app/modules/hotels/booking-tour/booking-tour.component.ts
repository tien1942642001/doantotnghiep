import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/core/service/home.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-booking-tour',
  templateUrl: './booking-tour.component.html',
  styleUrls: ['./booking-tour.component.scss']
})
export class BookingTourComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  siteId: any;
  hotelId: any;
  arrivalDate: any;
  selectedHotel = null;
  currentDate = new Date().getTime();
  hotelList: any[] = [];
  roomTypeList: any[] = [];
  pageSize: Number = 10;
  pageIndex: Number = 0;

  roomList: any[] = [
    {
      id: 1,
      noPeopel: 1,
      noChildren: 1,
    },
  ];
  noPeopel: any = 1;
  noChildren: any = 1;

  checkOptionsService: any[] = [
    { value: 1, label: 'Tất cả', checked: true },
    { value: 2, label: 'Gói nghỉ dưỡng', checked: true },
    { value: 3, label: 'VinWonders', checked: true },
    { value: 4, label: 'Vận chuyển', checked: true },
    { value: 5, label: 'Vinpearl Golf', checked: true },
    { value: 5, label: 'Ẩm thực', checked: true },
    { value: 5, label: 'Tour', checked: true },
    { value: 5, label: 'Vé tham quan', checked: true },
    { value: 5, label: 'Spa', checked: true },
  ];

  checkOptionsAccommodation: any[] = [
    { value: 1, label: 'Tất cả', checked: true },
    { value: 2, label: '1 ngày', checked: true },
    { value: 3, label: '2 ngày 1 đêm', checked: true },
    { value: 3, label: '3 ngày 2 đêm', checked: true },
    { value: 3, label: '4 ngày 3 đêm', checked: true },
    { value: 3, label: '5 ngày 4 đêm', checked: true },
    { value: 3, label: '6 ngày 4 đêm', checked: true },
    { value: 3, label: '6 ngày 5 đêm', checked: true },
    { value: 3, label: '22 ngày 21 đêm', checked: true },
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
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.siteId = params['siteId'];
      this.hotelId = params['hotelId'];
      this.arrivalDate = params['arrivalDate'];
      this.getAllHotel(this.siteId);
    })
  }

  handleRoomTypeSelect(data: any) {
    this.checkRoomSelect = data;
    this.getAllRoomType(data.id);
  }

  getAllHotel(siteId: Number) {
    this.homeService.getAllHotel(this.pageSize, this.pageIndex, siteId).subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.hotelList = res.data.content;
      }
    });
  }

  getAllRoomType(hotelId: Number) {
    this.homeService.getAllRoomType(this.pageSize, this.pageIndex, hotelId).subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.roomTypeList = res.data.content;
      }
    });
  }

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

  formGroup: FormGroup = new FormGroup({
    selectedHotel: new FormControl(),
    rangePicker: new FormControl([this.currentDate, this.currentDate + 86400000 * 2]),
  });

  searchHotels () {
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
}

