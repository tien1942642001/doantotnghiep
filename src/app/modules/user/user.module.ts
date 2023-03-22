import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { MyPostComponent } from './my-post/my-post.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { SharedModule } from 'src/app/shared/share.module';

@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    MyPostComponent,
    MyOrderComponent,
    DetailOrderComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzDropDownModule,
    NzSpinModule,
    NzFormModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    SharedModule,
  ]
})
export class UserModule { }
