import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (authCreateTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
  ]
})

export class AuthModule {
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

export function authCreateTranslateLoader(http: HttpClient) {
  console.log('AuthModule createTranslateLoader');
  return new TranslateHttpLoader(
    http, './assets/i18n/auth/', '.json');
}