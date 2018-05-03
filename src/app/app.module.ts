import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {ChartModule} from 'angular2-highcharts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { DataProvider } from '../providers/data/data';
import {HttpClientModule} from "@angular/common/http";
import {PavillonPage} from "../pages/pavillon/pavillon";
import {RegisterPage} from "../pages/register/register";
import {ReservationPage} from "../pages/reservation/reservation";
import {NativeStorage} from "@ionic-native/native-storage";
import {ChartsPage} from "../pages/charts/charts";
import {RatingModule} from "ngx-rating";
import {ConfirmReservationPage} from "../pages/confirm-reservation/confirm-reservation";
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

declare let require:any;
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  const de = require('highcharts/highcharts-3d.js');
  dd(hc);
  de(hc);
  return hc;
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PavillonPage,
    RegisterPage,
    ReservationPage,
    ChartsPage,
    ConfirmReservationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RatingModule,
    ChartModule,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PavillonPage,
    RegisterPage,
    ReservationPage,
    ChartsPage,
    ConfirmReservationPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    DataProvider
  ]
})
export class AppModule {}
