import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TourComponent } from './tour/tour.component';
import { HotelResortComponent } from './hotel-resort/hotel-resort.component';
import { HotelFlightComponent } from './hotel-flight/hotel-flight.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 
@NgModule({
 declarations: [
   HotelResortComponent,
   HotelFlightComponent,
   TourComponent,
 ],
 imports: [
   CommonModule,
   FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzTabsModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzDropDownModule,
    NzToolTipModule,
    NzCardModule,
    NzCollapseModule,
    NzCheckboxModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (shareCreateTranslateLoader),
        deps: [HttpClient]
      },
      isolate: false
    }),
 ],
 exports: [
   HotelResortComponent,
   HotelFlightComponent,
   TourComponent,
 ]
})
export class SharedModule { }

export function shareCreateTranslateLoader(http: HttpClient) {
  console.log('HomeModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/share/', '.json');
}