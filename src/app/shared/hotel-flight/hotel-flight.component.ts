import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-flight',
  templateUrl: './hotel-flight.component.html',
  styleUrls: ['./hotel-flight.component.scss']
})
export class HotelFlightComponent implements OnInit {

  locationId: any;
  hotelId: any;
  arrivalDate: any;
  selectedHotel = null;
  currentDate = new Date().getTime();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.locationId = params['locationId'];
      this.hotelId = params['hotelId'];
      this.arrivalDate = params['arrivalDate'];
      console.log(params);
    })
    
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

  roomList: any[] = [
    {
      id: 1,
      noPeopel: 1,
      noChildren: 1,
    },
  ];
  noPeopel: any = 1;
  noChildren: any = 1;

  onIncreaseRoom(idx: Number) {
    if (idx == 0) {
      this.roomList[0].noChildren
    }
    let count = this.roomList.length;
    this.roomList.push(count + 1);
  }

  onIncreasePeople() {
    this.noPeopel++;
  }

  onIncreaseChildren() {
    this.noChildren++;
  }

  onDecreaseRoom() {
    this.roomList.pop();
  }

  onDecreasePeople() {
    this.noPeopel--;
  }

  onDecreaseChildren() {
    this.noChildren--;
  }

  handleOk() {
    console.log(123);
  }

  formHotelFlight: FormGroup = new FormGroup({
    selectedHotel: new FormControl(),
    rangePicker: new FormControl([this.currentDate, this.currentDate + 86400000 * 2]),
  });

  searchHotels () {
    console.log(this.formHotelFlight.value);
    this.router.navigate(['/hotels/search-hotel'], {
      queryParams: {locationId: '1', hotelId: '2', arrivalDate: '3', }
    });
  }

  handleCheckFocus(name: any) {
    if (name == "focus") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.add("active");
    }

    if (name == "blur") {
      document.querySelectorAll(".ant-row.ant-form-item")[0].classList.remove("active");
    }
  }

}
