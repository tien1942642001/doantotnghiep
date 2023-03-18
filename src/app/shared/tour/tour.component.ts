import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSelectPlacementType } from 'ng-zorro-antd/select';
import { HomeService } from 'src/app/core/service/home.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  placementSelect: NzSelectPlacementType = 'bottomLeft';
  siteId: any;
  searchName: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.getAllSite();

    this.route.queryParams.subscribe(params => {
      if (params['siteId']) {
        this.siteId = parseInt(params['siteId']);
      }
      if (params['searchName']) {
        this.searchName = parseInt(params['searchName']);
      }
    })

    if (this.router.url.includes("hotels/search-tour")) {
      this.formTour.controls['siteId'].setValue(this.siteId);
      this.formTour.controls['searchName'].setValue(this.searchName);
    }
  }

  listOfSite: any[] = [];

  formTour: FormGroup = new FormGroup({
    searchName: new FormControl(),
    siteId: new FormControl(),
  });

  getAllSite() {
    this.homeService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
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

  searchBooking () {
    const formValue = this.formTour.value;
    this.router.navigate(['hotels/search-tour'], {
      queryParams: {siteId: formValue.siteId}
    });
  }
}
