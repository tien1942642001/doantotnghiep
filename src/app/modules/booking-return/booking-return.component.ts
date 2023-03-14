import { Component, OnInit } from '@angular/core';
import { NzSelectPlacementType } from 'ng-zorro-antd/select';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from 'src/app/core/service/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-return',
  templateUrl: './booking-return.component.html',
  styleUrls: ['./booking-return.component.scss']
})
export class BookingReturnComponent implements OnInit {
  paymentStatus: any;
  constructor(
    private translate: TranslateService,
    private homeService: HomeService,
    private route: ActivatedRoute, 
  ) {
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translate.use('vi');
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((item) => {
      console.log(item);
      this.paymentStatus = item['vnp_ResponseCode'];
    })

    if (this.paymentStatus == 24) {
      console.log(this.paymentStatus);
    }
  }

}
