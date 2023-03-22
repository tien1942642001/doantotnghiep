import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { REGEX_PATTERN } from 'src/app/core/constants/pattern';
import handle from 'src/app/core/functions/handle';
import { AuthService } from 'src/app/core/service/auth.service';
import { HomeService } from 'src/app/core/service/home.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {
  id: any;
  detailData: any;
  type: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.queryParams['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type == "hotel") {
      this.homeService.getBookingRoomDetail(this.id).subscribe(res => {
        if (res.code === 200) {
          this.detailData = res.data;
        }
      })
    } else if (this.type == "tour") {
      this.homeService.getBookingTourDetail(this.id).subscribe(res => {
        if (res.code === 200) {
          this.detailData = res.data;
        }
      })
    }
  }
}
