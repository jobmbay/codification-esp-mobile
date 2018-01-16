import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  data: Array<{label: string, details: string, icon: string, showDetails: boolean}> = [];

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }


  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    for(let i = 0; i < 3; i++ ){
      this.data.push({
        label: 'Title '+i,
        details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
