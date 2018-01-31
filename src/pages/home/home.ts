import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PavillonPage} from "../pavillon/pavillon";
import DataSeriesMapping = Highcharts.DataSeriesMapping;
import {DataProvider} from "../../providers/data/data";
import {User} from "../shared/models/user";
import {ReservationPage} from "../reservation/reservation";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  user={
    adresse: "",
    age:0,
    email:"",
    matricule: "",
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    username: "",
  };

  constructor(private nativeStorage: NativeStorage, private dataService: DataProvider, public modalCtrl: ModalController, public navCtrl: NavController) {
  }

  ngOnInit()
  {
    this.isconnected();
  }

  isconnected()
  {
    this.nativeStorage.getItem('user')
      .then(
        data => {
          this.getUser();
        },
        error => {
          this.loginPageShow()
        }
      );

  }

  loginPageShow()
  {
    let login = this.modalCtrl.create(LoginPage);

    login.onDidDismiss(data => {
      this.getUser();
    });

    login.present();

  }

  getUser()
  {
    this.nativeStorage.getItem('user')
      .then(
        data => {
          this.user = data;
          //this.dataProvider.get("Compteurs/count?where=" + encodeURIComponent('{"montant":{"gte":' + this.compteur.montant + '}, "vehiculeId":"' + this.voiture.id + '"}'))
        },
        error => console.error(error)
      );
  }

  pavionStat()
  {
    let profileModal = this.modalCtrl.create(PavillonPage);
    profileModal.present();
  }

  reservationPage()
  {
    let profileModal = this.modalCtrl.create(ReservationPage);
    profileModal.present();
  }

}
