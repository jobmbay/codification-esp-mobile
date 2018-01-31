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

declare var require:any;


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PavillonPage,
    RegisterPage,
    ReservationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule.forRoot(require('highcharts-3d')),
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
    ReservationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
