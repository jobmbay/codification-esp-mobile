import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  tour = 1;

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  loginPage()
  {
    this.viewCtrl.dismiss();
  }

  suivant()
  {
    if(this.tour<3)
    {
      this.tour = this.tour+1;
    }
  }

  retour()
  {
    if(this.tour>1)
    {
      this.tour = this.tour-1;
    }
  }

  validerRegister()
  {
    alert("Registered");
  }

}
