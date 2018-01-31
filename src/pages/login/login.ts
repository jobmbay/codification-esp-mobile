import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, ModalController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {RegisterPage} from "../register/register";
import {NativeStorage} from "@ionic-native/native-storage";

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

  constructor(private nativeStorage: NativeStorage, private modalCtrl: ModalController, public alertCtrl: AlertController, private dataprovider : DataProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    this.dataprovider.login(this.user).then(
      data=>{
        this.setUser(data);
        //document.getElementById("home").click();
        //document.getElementById("menu").click();
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

  setUser(user)
  {
    this.nativeStorage.setItem('user', user)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  inscriptinPgae()
  {
    let profileModal = this.modalCtrl.create(RegisterPage);
    profileModal.present();
  }

}
