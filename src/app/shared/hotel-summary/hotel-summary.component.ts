import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/core/service/home.service';
import {Router} from '@angular/router'

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
  subscription!: Subscription;
  constructor(
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateBooking() {
    this.router.navigate(['/hotels/booking']);
  }

}
