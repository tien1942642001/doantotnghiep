import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/core/service/home.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-hotel-summary',
  templateUrl: './hotel-summary.component.html',
  styleUrls: ['./hotel-summary.component.scss']
})
export class HotelSummaryComponent implements OnInit {
  @Input() nameHotel: any;
  @Input() arrivalDate: any;
  @Input() leaveDate: any;
  @Input() detailRoom: any;
  @Input() detailTour: any;
  @Input() typeBooking: any;
  checkHide: boolean = false;
  subscription!: Subscription;
  constructor(
    private homeService: HomeService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
   if (this.router.url.includes("hotels/booking")) {
    this.checkHide = true;
   } 
   if (this.typeBooking == "tour") {
    // this.subscription = this.homeService.dataTour.subscribe((data: any) => {
    //   if (data) {
    //     this.detailTour = data;
    //   } else {
    //     this.location.back();
    //   }
    // })
   }
  }

  navigateBooking() {
    this.router.navigate(['/hotels/booking']);
  }

}
