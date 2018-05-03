import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmReservationPage } from './confirm-reservation';

@NgModule({
  declarations: [
    ConfirmReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmReservationPage),
  ],
})
export class ConfirmReservationPageModule {}
