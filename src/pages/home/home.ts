import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PavillonPage} from "../pavillon/pavillon";
import DataSeriesMapping = Highcharts.DataSeriesMapping;
import {DataProvider} from "../../providers/data/data";
import {User} from "../shared/models/user";
import {ReservationPage} from "../reservation/reservation";
import {NativeStorage} from "@ionic-native/native-storage";
import {ChartsPage} from "../charts/charts";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  user = {
    id:"",
    prenom:"",
    nom:"",
    adresse:"",
    cycle:{
      id:"",
      label:""
    },
    niveau:{
      id:"",
      numero:0
    },
    option:{
      id:"",
      label:"",
      departement:{
        id:"",
        label:""
      }
    }
  };
  nbReservation= 0;
  nbCodification= 0;
  nbEtudiant= 0;
  batiments :any;

  constructor(private nativeStorage: NativeStorage, private dataService: DataProvider, public modalCtrl: ModalController, public navCtrl: NavController) {
    let urlToChangeStream1 = 'https://codification-esp-api.herokuapp.com/api/Positions/change-stream?_format=event-stream';
    let src1 = new window['EventSource'](urlToChangeStream1);
    src1.addEventListener('data', function(msg) {
      let data = JSON.parse(msg.data);
      if(document.getElementById("initializeAll"))
      document.getElementById("initializeAll").click();
      console.log("realtime",data); // the change object
    });

    let urlToChangeStream2 = 'https://codification-esp-api.herokuapp.com/api/Etudiants/change-stream?_format=event-stream';
    let src2 = new window['EventSource'](urlToChangeStream2);
    src2.addEventListener('data', function(msg) {
      let data = JSON.parse(msg.data);
      if(document.getElementById("initializeAll"))
      document.getElementById("initializeAll").click();
      console.log("realtime",data); // the change object
    });

  }

  ngOnInit()
  {
    this.isconnected();
    this.initialize();
  }

  initialize()
  {
    this.dataService.get("Positions/count?where=" + encodeURIComponent('{"status":"reservation"}'))
      .then(
        data=>{
          this.nbReservation=data["count"];
        },
        err=>{
          console.log(err);
        }
      );
    this.dataService.get("Positions/count?where=" + encodeURIComponent('{"status":"codification"}'))
      .then(
        data=>{
          this.nbCodification=data["count"];
        },
        err=>{
          console.log(err);
        }
      );
    this.dataService.get("Etudiants/count")
      .then(
        data=>{
          this.nbEtudiant=data["count"];

        },
        err=>{
          console.log(err);
        }
      )

    this.dataService.get('Batiments?filter=' + encodeURIComponent('{"order":"batiment.label","include": {"etages": {"chambres":{"positions":{"etudiant":[{"option":"departement"},"cycle","niveau"]}}}}}'))
      .then(
        data=>{
          this.batiments = data;

          this.batiments.forEach(function (batiment) {
            batiment.nbetudiant = 0;
            batiment.nbcodification = 0;
            batiment.nbchambre = 0;
            batiment.nbposition = 0;
            batiment.nbtotalposition = 0;
            batiment.nbreservation = 0;
            batiment.etages.forEach(function (etage) {
              etage.nbtotalposition = 0;
              etage.nbposition = 0;
              etage.chambres.forEach(function (chambre) {
                batiment.nbchambre ++;
                etage.nbtotalposition+= chambre.nbposition;
                batiment.nbtotalposition += chambre.nbposition;
                chambre.positions.forEach(function (position) {
                  batiment.nbposition ++;
                  etage.nbposition ++;
                  if(position.status=="reservation")
                  {
                    batiment.nbreservation ++;
                  }
                  else
                  {
                    batiment.nbcodification ++;
                  }
                });
              });
            });
          });
          console.log(this.batiments);
        },
        err=>{
          console.log(err);
        }
      );
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
          this.dataService.get('Etudiants/' + data["id"] + '?filter={"include":[{"option":"departement"},"cycle","niveau"]}')
            .then(
              user=>{
                console.log(user);
                this.user = user;
              }
            );
        },
        error => console.error(error)
      );
  }

  pavionStat(batiment)
  {
    let profileModal = this.modalCtrl.create(PavillonPage, {batimentId:batiment.id});
    profileModal.present();
  }

  reservationPage()
  {
    let profileModal = this.modalCtrl.create(ReservationPage, {mybatiments:this.batiments});
    profileModal.present();
  }

  statistiquePage()
  {
    let profileModal = this.modalCtrl.create(ChartsPage);
    profileModal.present();
  }

}
