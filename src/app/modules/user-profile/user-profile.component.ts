import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUrl: any;
  fullName: any;
  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);
    this.fullName = localStorage.getItem(constants.FULLNAME);
  }

  navigateUserProfile(flat: number) {
    if (flat === 1) {
      this.route.navigate(["/user/user-profile"])
    }
    if (flat === 2) {
      this.route.navigate(["/user/my-order"])
    }
  }

}
