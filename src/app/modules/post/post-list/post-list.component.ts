import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/service/home.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  listOfPost: any[] = [];
  pageSize = 9;
  pageIndex = 1;
  sort: any = "id,desc";
  totalItem: any = 0;
  constructor(
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.homeService.searchPost(9, 0).subscribe(res => {
      if (res.code == 200) {
        this.listOfPost = res.data.content;
        console.log(this.listOfPost);
      }
    })
  }

  navigateDetailPost(id: any) {
    this.router.navigate([`/post/detail/${id}`]);
  }

}
