import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/service/home.service';
import { Router } from "@angular/router";
import { Editor, Toolbar } from 'ngx-editor';
import constants from 'src/app/core/constants/constants';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  fileListName: any[] = [];
  imageInput: any[] = [];
  fileList: any[] = [];
  postId: boolean = false;
  listOfHotel: any[] = [];
  listOfSite: any[] = [];
  contentEditor: any;
  customerId: any = localStorage.getItem(constants.CUSTOMER_ID);
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

  constructor(
    private homeService: HomeService,
    private router: Router,
    private toast: ToastrService
  ) { }
  ngOnInit(): void {
    this.contentEditor = new Editor();
    this.getAllSite(this.customerId);
  }

  getAllSite(customerId: Number) {
    this.homeService.getAllSiteByCustomerId(customerId).subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
    });
  }

  getAllHotel(customerId: Number, siteId: Number) {
    this.listOfHotel = [];
    this.homeService.getAllHotelByCustomerId(customerId, siteId).subscribe(res => {
      if (res.code === 200) {
        // console.log(res.data.content);
        this.listOfHotel = res.data;
      }
    });
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.contentEditor.destroy();
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl("", {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ]
    }),
    site: new FormControl("", {
      validators: [
        Validators.required,
      ]
    }),
    hotel: new FormControl("", {
      validators: [
        // Validators.required,
      ]
    }),
    content: new FormControl("", {
      validators: [
        Validators.required,
      ]
    }),
  })

  onFileSelect(event: any) {
    this.fileList = event.target.files;
    this.fileListName = [];
    this.imageInput = [];
    for (let index = 0; index < this.fileList.length; index++) {
      var reader = new FileReader();
      reader.readAsDataURL(this.fileList[index]);

      reader.onload = (e: any) => {
        this.imageInput.push(e.target.result);
      };

      this.fileListName.push(this.fileList[index].name);
    }
  }

  savePost = async () => {
    const formValue = this.formGroup.value;
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }
    const customerId = JSON.parse(localStorage.getItem(constants.CUSTOMER_ID) || '{}');
    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("siteId", formValue.site);
    formData.append("hotelId", formValue.hotel);
    formData.append("content", formValue.content);
    formData.append("customerId", customerId);
    for (let index = 0; index < this.fileList.length; index++) {
      formData.append("images", this.fileList[index]);
    }

    // this.homeService.addPost(formData).subscribe(res => {
    //   if (res.body?.code == 200) {
    //     // this.toast.success('Thành công', 'Thông báo');
    //     this.router.navigate(['/post/post-list']);
    //   }
    //   // if (res.body?.code == 400) {
    //   //   this.toast.success('Lỗi', 'Thông báo');
    //   // }
    //   // if (res.body?.code == 404) {
    //   //   this.toast.success('Lỗi', 'Thông báo');
    //   // }
    // })

    try {
      const res = await this.homeService.addPost(formData);
      if (res.data.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/post/post-list']);
      }
      if (res.data.code == 400) {
        this.toast.error('Lỗi', 'Thông báo');
      }
      if (res.data.code == 404) {
        this.toast.error('Lỗi', 'Thông báo');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onCancel() {
    this.router.navigate(["/home"]);
  }

  getHotel() {
    this.getAllHotel(this.customerId, this.formGroup.value.site);
  }

}
