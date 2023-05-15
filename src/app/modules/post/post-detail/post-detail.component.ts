import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import constants from 'src/app/core/constants/constants';
import { AuthService } from 'src/app/core/service/auth.service';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/service/home.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import 'moment/locale/vi';
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
  sort: any = "id,desc";
  listOfData: any[] = [];
  idPost: any;
  post: any;
  showComment: boolean = false;
  checkEditor: boolean = false;
  checkIsLike: any = 0;
  idLike: any;
  contentEditor: any;
  contentForm: any = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  sendUpActive: boolean = false;
  checkReplyComment: any = -100;
  commentContent: any = "Đã từng học khóa 18+ ở Mindx nhưng thấy ở đây dạy rất chán @@ đúng là được cái nhiệt tình hỗ trợ từ sale cho đến mentor, nhưng học để hiểu thì mình thấy F8 dễ hiểu hơn rất nhiều so với Mindx";
  commentList: any[] = [];
  commentTotal: number = 0;
  likeTotal: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private homeService: HomeService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) { }

  editor: Editor = new Editor;
  html!: '';

  setShowComment(data: any) {
    this.showComment = data;
    if (data) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      this.authService.searchComment(this.idPost, this.pageIndex, this.pageSize, this.sort).subscribe(res => {
        if (res.code === 200) {
          this.commentList = res.data.content;
        }
      })
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  setCheckReplyComment(id: any, content: any) {
    this.checkReplyComment = id;
    if (content) {
      this.formGroupReply.controls['content'].setValue(content);
    } else {
      this.formGroupReply.controls['content'].setValue("");
    }
  }

  ngOnInit(): void {
    this.contentEditor = new Editor();
    this.route.params.subscribe((param: any) => {
      this.idPost = param.id;
    } )
    this.customerId = localStorage.getItem(constants.CUSTOMER_ID);
    this.authService.detailPost(this.idPost).subscribe(res => {
      if (res.code === 200) {
        this.post = res.data;
        this.likeTotal = res.data.countLike;
        this.commentTotal = res.data.countComment;
      }
    })
    this.authService.checkCustomerLike(
      {
        postId: this.idPost,
        customerId: this.customerId
      }
    ).subscribe(res => {
      if (res.code === 200) {
        this.checkIsLike = res.data.status;
        this.idLike = res.data.id;
      }
    })
  }

  formGroup: FormGroup = new FormGroup({
    content: new FormControl("", {
      validators: [

      ]
    }),
  })

  formGroupReply: FormGroup = new FormGroup({
    content: new FormControl("", {
      validators: [

      ]
    }),
  })

  savePost = async () => {
    const data = {
      content: this.contentForm,
      customerId: localStorage.getItem(constants.CUSTOMER_ID),
    }
    this.authService.addComment(this.idPost, data).subscribe(res => {
      if (res.body?.code == 200) {

      }
    })
  }

  // Lấy thời gian comment
  commentDate = new Date(1682396582046);

  // Tính khoảng cách thời gian
  timeAgo = moment(this.commentDate).fromNow();

  addComment() {
    // phương thức bypassSecurityTrustHtml sẽ loại bỏ ký tự độc lại khi thêm mới bình luận
    const conent = this.sanitizer.bypassSecurityTrustHtml(this.formGroup.value.content);
    const data = {
      content: conent,
      postId: this.idPost,
      customerId: localStorage.getItem(constants.CUSTOMER_ID)
    }
    this.authService.addComment(this.idPost, data).subscribe(res => {
      if (res.code === 200) {
        // this.commentList.unshift(res.data);
        this.setShowComment(true);
        this.checkEditor = false;
        this.commentTotal++;
      }
    })
  }

  deleteComment(id: any, idx: any) {
    this.authService.deleteComment(this.idPost, id).subscribe(res => {
      if (res.code === 200) {
        // this.commentList = this.commentList.filter(item => item.id != id);
        this.commentList.splice(idx, 1);
        this.commentTotal -= 1;
      }
    })
  }

  updateComment(id: any, data: any) {
    const data1 = {
      content: this.formGroupReply.value.content,
      postId: this.idPost,
      customerId: localStorage.getItem(constants.CUSTOMER_ID)
    }
    this.authService.updateComment(this.idPost, id, data1).subscribe(res => {
      if (res.code === 200) {
        this.setShowComment(true);
        this.checkReplyComment = 0;
      }
    })
  }

  updateLike() {
    const data = {
      id: this.idLike,
      postId: this.idPost,
      customerId: localStorage.getItem(constants.CUSTOMER_ID),
      status: this.checkIsLike ? 0 : 1,
    }
    this.authService.updateLike(data).subscribe(res => {
      if (res.code === 200) {
        this.checkIsLike = !this.checkIsLike;
        if (this.checkIsLike) {
          this.likeTotal ++;
        } else {
          this.likeTotal --;
        }
      }
    })
  }
}
