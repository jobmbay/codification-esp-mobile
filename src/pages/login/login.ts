import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, ModalController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    username: "",
    password: ""
  }

  constructor(private modalCtrl: ModalController, public alertCtrl: AlertController, private dataprovider : DataProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    this.dataprovider.login(this.user).then(
      data=>{
        this.dataprovider.setUser(data.user);
        this.dataprovider.setTocken(data.id);
        this.viewCtrl.dismiss();
      },
      err=> {
        this.user.password="";
        let alert = this.alertCtrl.create({
          title: 'Incorrecte!',
          subTitle: "Nom d'utilisateur ou mot de passe incorrecte!",
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  inscriptinPgae()
  {
    let profileModal = this.modalCtrl.create(RegisterPage);
    profileModal.present();
  }

}
