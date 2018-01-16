import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {DataProvider} from "../../providers/data/data";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    DataProvider,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
