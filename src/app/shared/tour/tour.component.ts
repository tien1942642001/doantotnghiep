import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzSelectPlacementType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  placementSelect: NzSelectPlacementType = 'bottomLeft';
  selectedHotel = null;
  constructor(
    private route: Router, 
  ) { }

  ngOnInit(): void {
  }

  hotelDefault: any[] = [
    {
      id: 1,
      name: "Hải Phòng",
      type: "location",
    },
    {
      id: 2,
      name: "Nha Trang",
      type: "location",
    },
    {
      id: 3,
      name: "Hồ Chí Minh",
      type: "location",
    },
    {
      id: 4,
      name: "Hà Nội",
      type: "location",
    },
    {
      id: 5,
      name: "Đà Nẵng",
      type: "location",
    },
    {
      id: 6,
      name: "Hạ Long",
      type: "location",
    },
    {
      id: 7,
      name: "Phú Quốc",
      type: "location",
    },
    {
      id: 8,
      name: "Vinpearl Discovery Golflink Nha Trang",
      type: "hotel",
    },
    {
      id: 9,
      name: "VinHolidays Fiesta Phú Quốc",
      type: "hotel",
    },
    {
      id: 10,
      name: "Vinpearl Resort & Golf Nam Hội An",
      type: "hotel",
    },
    {
      id: 11,
      name: "Vinpearl Resort & Spa Phú Quốc",
      type: "hotel",
    },
    {
      id: 12,
      name: "Vinpearl Condotel Beachfront Nha Trang",
      type: "hotel",
    },
    {
      id: 13,
      name: "Vinpearl Resort & Spa Hạ Long",
      type: "hotel",
    },
    {
      id: 14,
      name: "Vinpearl Resort Nha Trang",
      type: "hotel",
    },
    {
      id: 15,
      name: "Vinpearl Luxury Nha Trang",
      type: "hotel",
    },
    {
      id: 16,
      name: "Vinpearl Discovery Sealink Nha Trang",
      type: "hotel",
    },
    {
      id: 17,
      name: "Vinpearl Resort & Spa Đà Nẵng",
      type: "hotel",
    },
    {
      id: 18,
      name: "VinOasis Phú Quốc",
      type: "hotel",
    },
    {
      id: 19,
      name: "Vinpearl Discovery Wonderworld Phú Quốc",
      type: "hotel",
    },
    {
      id: 20,
      name: "Vinpearl Resort & Spa Hội An",
      type: "hotel",
    },
    {
      id: 21,
      name: "Vinpearl Resort & Spa Nha Trang Bay",
      type: "hotel",
    },
  ];

  formTour: FormGroup = new FormGroup({
    searchName: new FormControl(),
    selectedHotel: new FormControl(),
  });
  
  handleCheckFocus(name: any) {
    if (name == "focus") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.add("active");
    }

    if (name == "blur") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.remove("active");
    }
  }

  searchBooking () {
    console.log(this.formTour.value);
    this.route.navigate(['/hotels/booking-search'], {
      queryParams: {locationId: '1', hotelId: '2', arrivalDate: '3', }
    });
  }
}
