import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/core/service/home.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-booking-search',
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss']
})
export class BookingSearchComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  siteId: any;
  routeHotel: any;
  arrivalDate: any;
  leaveDate: any;
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
      this.siteId = params['siteId'];
      this.arrivalDate = params['arrivalDate'];
      this.getAllHotel(this.siteId);
    })
    this.routeHotel = this.route.snapshot.params['id'];
    if (this.routeHotel) {
      this.checkRoomSelect = true;
      this.getAllRoomType(this.routeHotel);
    }
  }

  handleRoomTypeSelect(id: any) {
    this.router.navigate([`/hotels/booking-search/${id}`], {
      queryParams: {
        siteId: this.siteId,
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
