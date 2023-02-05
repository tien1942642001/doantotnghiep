import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { BookingSearchComponent } from './booking-search/booking-search.component';
import { BookingTourComponent } from './booking-tour/booking-tour.component';

const routes: Routes = [
  {
    path: "",
    component: HotelComponent,
  },
  {
    path: "booking-search",
    component: BookingSearchComponent,
  },
  {
    path: "booking-tour",
    component: BookingTourComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
