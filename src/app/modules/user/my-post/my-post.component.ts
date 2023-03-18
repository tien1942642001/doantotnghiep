import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {

  customerId: any;
  isSpinning = false;
  pageSize: any = 10;
  pageIndex: any = 0;
  listOfData: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem(constants.CUSTOMER_ID); 
    this.authService.searchPost(this.customerId, this.pageIndex, this.pageSize).subscribe(res => {
      if (res.code === 200) {
        this.listOfData = res.data.content;
      }
    })
  }

  navigateBlog(id: any) {
    this.router.navigate([`/post/detail/${id}`]);
  }

}
