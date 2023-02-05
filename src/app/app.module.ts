import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// import ngx-translate and the http loader
import {LangChangeEvent, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SearchComponent } from './shared/search/search.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    // SearchComponent,
  ],
  imports: [
    BrowserModule,
    NzIconModule,
    // ngx-translate and the loader module
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    NzTabsModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzDropDownModule,
    NzToolTipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: appCreateTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
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

export function appCreateTranslateLoader(http: HttpClient) {
  console.log('AppModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/auth/', '.json');
}