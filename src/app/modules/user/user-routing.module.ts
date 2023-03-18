import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyPostComponent } from './my-post/my-post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: "user",
    component: UserComponent,
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
  },
  {
    path: "my-order",
    component: MyOrderComponent,
  },
  {
    path: "my-order/:id",
    component: MyOrderComponent,
  },
  {
    path: "my-post",
    component: MyPostComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
