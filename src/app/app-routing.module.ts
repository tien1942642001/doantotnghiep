import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'population',
        loadChildren: () => import('./modules/population/population.module').then(m => m.PopulationModule)
      },
      {
        path: 'hotels',
        loadChildren: () => import('./modules/hotels/hotel.module').then(m => m.HotelModule)
      },
      {
        path: 'user',
        // component: UserProfileComponent,
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)
      },
      {
        path: 'meeting-events',
        component: HomeComponent,
      },
      {
        path: 'grand-world',
        component: HomeComponent,
      },
      {
        path: 'promotion',
        component: HomeComponent,
      },
      {
        path: 'promotion/pearl-club',
        component: HomeComponent,
      },
      {
        path: 'pearlclub',
        component: HomeComponent,
        children: [
          {
            path: 'benefits',
            component: HomeComponent,
          },
          {
            path: 'applicable-list',
            component: HomeComponent,
          },
          {
            path: 'terms-of-use',
            component: HomeComponent,
          },
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'pages/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
