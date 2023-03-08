import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './interceptor/app.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi:true
    },
  ]
})
export class CoreModule {
  static injector: Injector
  constructor(injector: Injector){
    CoreModule.injector = injector
  }
}
