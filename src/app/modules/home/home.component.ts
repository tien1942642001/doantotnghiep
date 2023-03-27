import { Component, OnInit } from '@angular/core';
import { NzSelectPlacementType } from 'ng-zorro-antd/select';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'src/app/core/service/home.service';
import { Router } from '@angular/router';
import { AirrlineService } from 'src/app/core/service/airline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  array = [1, 2, 3, 4];
  effect = 'scrollx';

  nav_list: any;
  indexTab: Number = 0;
  showDropMoney: Boolean = false;
  showDropLanguage: Boolean = false;
  placementSelect: NzSelectPlacementType = 'bottomLeft';
  currentDate = new Date().getTime();
  listOfPost: any[] = [];

  bookingTypes: any[] = [
    {
      id: 0,
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
      id: 1,
      name: "Khách sạn + Vé máy bay",
      icon: "icon_hotel_flight_w",
      iconActive: "icon_hotel_flight_y",
    },
    {
      id: 2,
      name: "Tour & Trải nghiệm",
      icon: "icon_tour_w",
      iconActive: "icon_tour_y",
    },
  ];

  constructor(
    private translate: TranslateService,
    private homeService: HomeService,
    private route: Router,
    private airrlineService: AirrlineService,
  ) {
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translate.use('vi');
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
        ] 
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
        ]
    },
    {
      name: "Ưu đã khuyến mại",
      child: [
        "Ưu đã nổi bật",
        "Ưu đãi Pearl Club"
      ]
    },
    {
      name: "Pearl Club",
      child: [
        "Tổng quan",
        "Quyền lợi",
        "Hế thống áp dụng",
        "Điều kiện điều khoản"
      ]
    }
    ];

    this.homeService.searchPost(3, 0).subscribe(res => {
      if (res.code == 200) {
        this.listOfPost = res.data.content;
      }
    })

    this.airrlineService.getFlightSchedule('HAN', 'PQC', '2022-03-24').subscribe(
      (response: any) => {
        // this.flightSchedule = response;
      }
    );
  }

  selectedIndexChange(idx: any) {
    this.indexTab = idx;
  }

  handleOk() {
    console.log(123);
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  handleShowDrop(name: any) {
    if (name == "money") {
      this.showDropMoney = !this.showDropMoney;
    }
    if (name == "language") {
      this.showDropLanguage = !this.showDropLanguage;
    } 
  }

  searchTour(id: any) {
    this.route.navigate(['hotels/search-tour'], {
      queryParams: {siteId: id}
    });
  }

  navigatePostList() {
    this.route.navigate(['/post/post-list']);
  }

  navigateDetailPost(id: any) {
    this.route.navigate([`/post/detail/${id}`]);
  }

}
