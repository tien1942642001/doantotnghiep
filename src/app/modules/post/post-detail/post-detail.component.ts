import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  customerId: any;
  isSpinning = false;
  pageSize: any = 10;
  pageIndex: any = 0;
  listOfData: any[] = [];
  idPost: any;
  post: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.idPost = param.id;
    } )
    this.customerId = localStorage.getItem(constants.CUSTOMER_ID); 
    this.authService.detailPost(this.idPost).subscribe(res => {
      if (res.code === 200) {
        this.post = res.data;
      }
    })
  }

}
