import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberInput } from 'ng-zorro-antd/core/types';
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

  checkOptionsSuitables: any[] = [
    { value: 1, label: 'Cặp đôi', checked: true },
    { value: 2, label: 'Gia đình', checked: true },
    { value: 3, label: 'Nhóm bạn', checked: true },
    { value: 4, label: 'Doanh nhân', checked: true },
  ];

  checkTourSelect: any;
  siteId: any;
  searchName: any;
  hotelDetail: any;
  tourId: any;
  selectedSite = null;
  currentDate = new Date().getTime();
  tourList: any[] = [];
  roomTypeList: any[] = [];
  pageSize: any = 10;
  pageIndex: any = 1;
  sort: any = 'id,desc';
  remainingOfPeople: number = 0;
  showPeople: any;
  showTotalPrice: boolean = false;
  numberChildren: number = 0;
  noParent: number = 0;
  noChildren: number = 0;
  tourDetail: any;
  hotelList: any[] = [];
  hideDetail: boolean = false;
  totalItems: any = 0;

  selectedValue: any;

  onValueChange() {
    if (this.selectedValue == '0') {
      this.sort = 'th.priceAdult,desc';
    } else if (this.selectedValue == '1') {
      this.sort = 'th.priceAdult,asc';
    } if (this.selectedValue == '2') {
      this.sort = 'th.priceAdult,desc';
    }
    setTimeout(() => {
      this.getAllTour();
    }, 600)
  }

  suitableList: any[] = this.checkOptionsTypeOfTour.map(item => item.value);
  lengthStayIdList: any[] = this.checkOptionsLengthStayIds.map(item => item.value);
  typeOfTourIdList: any[] = this.checkOptionsTypeOfTour.map(item => item.value);

  allCheckedTypeOfTour = true;
  indeterminateTypeOfTour = true;

  selectedTypeOfTours: any[] = this.typeOfTourIdList;
  selectedLengthStayIds: any[] = this.lengthStayIdList;
  selectedSuitables: any[] = this.suitableList;

  getListTour(event: any[]) {
    console.log(event);
    // const typeOfTours = number == 1 ? event : this.typeOfTourIdList;
    // const lengthStayIds = number == 2 ? event : this.lengthStayIdList;
    // const suitableIds = number == 3 ? event : this.suitableList;
    const data = {
      name: "",
      leavingToId: this.siteId,
      // suitableIds: suitableIds,
      // typeOfTours: typeOfTours,
      // lengthStayIds: lengthStayIds,
      page: this.pageIndex - 1,
      size: this.pageSize,
      sort: this.sort,
    };
    this.getAllTour();
  }

  getListTour1(event: any[]) {
    this.selectedTypeOfTours = event;
    this.getAllTour();
  }

  getListTour2(event: any[]) {
    this.selectedLengthStayIds = event;
    this.getAllTour();
  }

  getListTour3(event: any[]) {
    this.selectedSuitables = event;
    this.getAllTour();
  }

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
      this.searchName = params['searchName'];
      this.getAllTour();
    })

    this.tourId = this.route.snapshot.params['id'];
    if (this.tourId) {
      this.tourService.getDetailTour(this.tourId).subscribe(res => {
        if (res.code === 200) {
          this.tourDetail = res.data[0].tour;
          this.hotelList = res.data;
          let priceAdultMin = 0;
          priceAdultMin = this.hotelList[0].priceAdult;
          this.hotelList.forEach(item => {
            if (item.priceAdult < priceAdultMin) {
              priceAdultMin = item.priceAdult;
            }
            this.tourDetail.priceAdultMin = priceAdultMin;
          })
        }
      })
    }
  }

  getAllTour() {
    const data = {
      name: "",
      leavingToId: this.siteId,
      suitableIds: this.selectedSuitables,
      typeOfTours: this.selectedTypeOfTours,
      lengthStayIds: this.selectedLengthStayIds,
      page: this.pageIndex - 1,
      size: this.pageSize,
      sort: this.sort,
    };

    this.tourService.getAllTour(data).subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.tourList = res.data.content;
        this.totalItems = res.data.totalElements;
        this.tourList.forEach(item => {
          item.numberBuyer = item.numberOfPeople - item.remainingOfPeople;
          item.checkExpirationDate = new Date().getTime() > item.expirationDate;
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

  changeCurrentPage(currentPage: number) {
    this.pageIndex = currentPage;
    this.getAllTour();
  }

  changeItemPerPage(itemPerPage: number) {
    this.pageIndex = 1;
    this.pageSize = itemPerPage;
    this.getAllTour();
  }
}

