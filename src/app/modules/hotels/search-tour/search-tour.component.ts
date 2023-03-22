import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { HomeService } from 'src/app/core/service/home.service';
import { TourService } from 'src/app/core/service/tour.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-search-tour',
  templateUrl: './search-tour.component.html',
  styleUrls: ['./search-tour.component.scss']
})
export class SearchTourComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  fullName: any = localStorage.getItem(constants.FULLNAME);
  siteId: any;
  hotelDetail: any;
  tourId: any;
  selectedSite = null;
  currentDate = new Date().getTime();
  tourList: any[] = [];
  roomTypeList: any[] = [];
  pageSize: Number = 10;
  pageIndex: Number = 0;
  numberBuyer: number = 0;
  showPeople: any;
  showTotalPrice: boolean = false;
  numberChildren: number = 0;
  noParent: number = 0;
  noChildren: number = 0;
  tourDetail: any;
  hotelList: any[] = [];
  hideDetail: boolean = false;

  suitableList: any[] = [];
  lengthStayIdList: any[] = [];

  allCheckedTypeOfTour = true;
  indeterminateTypeOfTour = true;
  
  updateAllCheckedTypeOfTour(): void {
    this.indeterminateTypeOfTour = false;
    if (this.allCheckedTypeOfTour) {
      this.checkOptionsTypeOfTour = this.checkOptionsTypeOfTour.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.checkOptionsTypeOfTour = this.checkOptionsTypeOfTour.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsTypeOfTour.every(item => !item.checked)) {
      this.allCheckedTypeOfTour = false;
      this.indeterminateTypeOfTour = false;
    } else if (this.checkOptionsTypeOfTour.every(item => item.checked)) {
      this.allCheckedTypeOfTour = true;
      this.indeterminateTypeOfTour = false;
    } else {
      this.indeterminateTypeOfTour = true;
    }
    console.log(this.checkOptionsTypeOfTour);
  }

  checkOptionsTypeOfTour: any[] = [
    { value: 1, label: 'Gói nghỉ dưỡng', checked: true },
    { value: 2, label: 'VinWonders', checked: true },
    { value: 3, label: 'Vận chuyển', checked: true },
    { value: 4, label: 'Vinpearl Golf', checked: true },
    { value: 5, label: 'Ẩm thực', checked: true },
    { value: 6, label: 'Tour', checked: true },
    { value: 7, label: 'Vé tham quan', checked: true },
    { value: 8, label: 'Spa', checked: true },
  ];

  checkOptionsLengthStayIds: any[] = [
    { value: 1, label: '1 ngày', checked: true },
    { value: 2, label: '2 ngày 1 đêm', checked: true },
    { value: 3, label: '3 ngày 2 đêm', checked: true },
    { value: 4, label: '4 ngày 3 đêm', checked: true },
    { value: 5, label: '5 ngày 4 đêm', checked: true },
    { value: 6, label: '6 ngày 4 đêm', checked: true },
    { value: 7, label: '6 ngày 5 đêm', checked: true },
    { value: 8, label: '22 ngày 21 đêm', checked: true },
  ];

  checkTourSelect: any;

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
    private tourService: TourService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.siteId = params['siteId'] ? parseInt(params['siteId']) : '';
      this.getAllTour('', this.siteId, this.suitableList, this.lengthStayIdList);
    })
    this.tourService.getDetailTour(2).subscribe(res => {
      if (res.code === 200) {
        this.tourDetail = res.data[0].tour;
        this.hotelList = res.data;
      }
    })

    this.tourId = this.route.snapshot.params['id'];
  }

  getAllTour(name: any, leavingToId: Number, suitableList: any, lengthStayIdList: any) {
    this.tourService.getAllTour(name, leavingToId, suitableList, lengthStayIdList, this.pageSize, this.pageIndex).subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.tourList = res.data.content;
        this.tourList.forEach(item => {
          item.numberBuyer = item.numberOfPeople - item.remainingOfPeople
        })
      }
    });
  }

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

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    selectedSite: new FormControl('', Validators.required),
    rangePicker: new FormControl([this.currentDate, this.currentDate + 86400000 * 2]),
  });

  // searchHotels () {
  //   const formValue = this.formGroup.value;
  //   this.getAllTour(formValue.name, formValue.selectedSite);
  // }

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

  onChangeTypeOfTour(value: any): void {
    console.log(value);
    console.log(this.checkOptionsLengthStayIds);
    this.getAllTour('', this.siteId, value, this.lengthStayIdList);
    this.suitableList = value;
  }

  onChangeLengthStay(value: any): void {
    console.log(value);
    console.log(this.checkOptionsLengthStayIds);
    this.getAllTour('', this.siteId, this.lengthStayIdList, value);
    this.lengthStayIdList = value;
  }

  handleTourSelect(id: Number) {
    this.router.navigate([`/hotels/search-tour/${id}`])
  }

  selectHotel(index: any, data: any) {
    this.showPeople = index;
    this.hotelDetail = data;
  }

  cancelHotel(hotelId: any) {
    this.showPeople = null;
    this.noChildren = 0;
    this.noParent = 0;
  }

  showHideTotalPrice() {
    this.hideDetail = !this.hideDetail;
  }

  navigateBooking() {
    const customerId = localStorage.getItem(constants.CUSTOMER_ID) || "";
    const paymentAmount = this.hotelList[this.showPeople]?.priceChildren * this.noChildren + this.hotelList[this.showPeople]?.priceAdult * this.noParent;
    const data = {
      tourId: this.tourId,
      hotelId: this.hotelDetail.hotel.id,
      customerId: parseInt(customerId),
      numberAdult: this.noParent,
      numberChildren: this.noChildren,
      description: "",
      paymentAmount: paymentAmount,
    }
    this.homeService.saveDataTour(data);
    this.router.navigate(['/hotels/booking'], {
      queryParams: {type: 'tour'}
    });
  }
}

