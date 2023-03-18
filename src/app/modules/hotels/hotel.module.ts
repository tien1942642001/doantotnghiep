import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel/hotel.component';
import { HotelRoutingModule } from './hotel-routing.modules';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SearchTourComponent } from './search-tour/search-tour.component';
import { SwiperModule } from 'swiper/angular';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/share.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';
// import { FormatPrice } from 'src/app/core/pipe/number.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { BookingComponent } from './booking/booking.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
    declarations: [
      HotelComponent,
      SearchHotelComponent,
      SearchTourComponent,
      // FormatPrice,
      BookingComponent,
    ],
    imports: [
        CommonModule,
        HotelRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule,
        NzTabsModule,
        NzFormModule,
        NzSelectModule,
        NzDatePickerModule,
        NzAlertModule,
        NzButtonModule,
        NzModalModule,
        NzDropDownModule,
        NzStepsModule,
        NzToolTipModule,
        NzCardModule,
        NzCollapseModule,
        NzCheckboxModule,
        SharedModule,
        NzDividerModule,
        SwiperModule,
        NzRadioModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: appCreateTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ]
})

export class HotelModule {
  constructor(public translationService: TranslateService) {
    translationService.addLangs(['en', 'vi']);
    // this.translationService.store.onLangChange
    //   .subscribe((lang: LangChangeEvent) => {
    //     this.translationService.use(lang.lang).toPromise();
    //   },error =>{
    //     console.log(error)
    //   });
    if (localStorage.getItem('lang')) {
      translationService.use(localStorage.getItem('lang')!);
    } else {
      localStorage.setItem('lang', 'vi');
      translationService.use('vi');
    }
  }
}

export function appCreateTranslateLoader(http: HttpClient) {
  console.log('HotelModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/hotel/', '.json');
}
