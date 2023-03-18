import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { HotelComponent } from './hotel/hotel.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { SearchTourComponent } from './search-tour/search-tour.component';

const routes: Routes = [
  {
    path: "",
    component: HotelComponent,
  },
  {
    path: "search-hotel",
    component: SearchHotelComponent,
  },
  {
    path: "search-hotel/:id",
    component: SearchHotelComponent,
  },
  {
    path: "search-tour",
    component: SearchTourComponent,
  },
  {
    path: "search-tour/:id",
    component: SearchTourComponent,
  },
  {
    path: "booking",
    component: BookingComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
