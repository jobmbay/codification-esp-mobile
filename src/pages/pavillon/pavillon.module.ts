import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PavillonPage } from './pavillon';

@NgModule({
  declarations: [
    PavillonPage,
  ],
  imports: [
    IonicPageModule.forChild(PavillonPage),
  ],
})
export class PavillonPageModule {}
