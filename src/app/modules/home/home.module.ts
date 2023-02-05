import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCarouselModule,
    SwiperModule,
    NzIconModule,
    NzTabsModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzDropDownModule,
    NzToolTipModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (homeCreateTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
  ]
})

export class HomeModule {
  constructor(public translationService: TranslateService) {
    translationService.addLangs(['en', 'vi']);
    this.translationService.store.onLangChange
      .subscribe((lang: LangChangeEvent) => {
        this.translationService.use(lang.lang).toPromise();
      },error =>{
        console.log(error)
      });
  }
}

export function homeCreateTranslateLoader(http: HttpClient) {
  console.log('HomeModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/home/', '.json');
}