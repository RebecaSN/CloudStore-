import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import localept from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material/angular-material.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localept, 'pt');

const maskConfig: Partial<IConfig> = {
  validation: false,
  dropSpecialCharacters: false,
  thousandSeparator: ",",
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    FlexLayoutModule,
    AngularMaterialModule,

    MatMomentDateModule,
    OAuthModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      enableHtml: true,
      timeOut: 17000,
      extendedTimeOut: 17000,
      progressBar: true,
    }),

    NgxMaskModule.forRoot(maskConfig),
    NgxCurrencyModule,
  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
