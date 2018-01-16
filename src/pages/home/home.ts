import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PavillonPage} from "../pavillon/pavillon";
import DataSeriesMapping = Highcharts.DataSeriesMapping;
import {DataProvider} from "../../providers/data/data";
import {User} from "../shared/models/user";
import {ReservationPage} from "../reservation/reservation";

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

  constructor(private dataService: DataProvider, public modalCtrl: ModalController, public navCtrl: NavController) {
  }

  ngOnInit()
  {
    if(this.dataService.isConnected()==false)
    {
      let profileModal = this.modalCtrl.create(LoginPage);
      profileModal.present();
    }
    this.user = this.dataService.getUser();
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
