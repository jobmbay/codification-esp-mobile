import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {DataProvider} from "../../providers/data/data";
import {NativeStorage} from "@ionic-native/native-storage";
import {ConfirmReservationPage} from "../confirm-reservation/confirm-reservation";

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
export class ReservationPage implements OnInit{

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

  batiments;
  pavs = [{
    id:"",
    label:"",
    nbchambres:0,
    nbetudiant : 0,
    nbcodification : 0,
    nbchambre : 0,
    nbposition : 0,
    nbtotalposition : 0,
    nbreservation : 0,
    charts:[
      {
        name:"Etage 1",
        y:22
      },
      {
        name:"Etage 2",
        y:12
      }
    ],
    etages:[{
      id:"",
      label:"",
      chambre:[{
        positions:[{
          etudiant:{
            option:{
              id:"",
              label:"",
              departement:{
                id:"",
                label:""
              }
            },
            cycle:{

            },
            niveau:{

            }
          }
        }]
      }]
    }]
  }];
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
      },
      cycle:{

      },
      niveau:{

      }
    }
  };
  pet = "";
  rating=3;

  tab1Root = LoginPage;
  tab2Root = RegisterPage;


  constructor(private modalCtrl : ModalController, private nativeStorage : NativeStorage, private dataService : DataProvider, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.pavs =this.navParams.get("mybatiments");
    this.pet = this.pavs[0].id;
    for(let i = 0; i < 3; i++ ){
      this.data.push({
        label: 'Title '+i,
        details: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }

    let urlToChangeStream1 = 'https://codification-esp-api.herokuapp.com/api/Positions/change-stream?_format=event-stream';
    let src1 = new window['EventSource'](urlToChangeStream1);
    src1.addEventListener('data', function(msg) {
      let data = JSON.parse(msg.data);
      console.log(msg.data)
      if(document.getElementById("reservation")){
        document.getElementById("reservation").click();
      }
      console.log("realtime",data);
    });
  }

  ngOnInit()
  {
    this.user = this.getUser();

    //this.initialisation();
  }

  initialisation()
  {
    let myUser = this.user;
    this.pavs.forEach(function (batiment) {

      batiment.nbchambres = 0;
      batiment["etages"].forEach(function (etage, index) {
        batiment["nbchambres"] += etage["chambres"].length;
        etage["chambres"].forEach(function (chambre) {
          chambre.affinite = 0;
          if(chambre["positions"].length==0)
          {
            chambre.affinite=0;
          }
          else
          {
            chambre.affinite=0;
            chambre["positions"].forEach(function (position) {
              if(position.etudiant.option.label==myUser.option.label)
              {
                chambre.affinite+=10;
              }
              if(position["etudiant"].option.departement.label==myUser.option.departement.label)
              {
                chambre.affinite+=7;
              }
              if(position["etudiant"].niveau.numero==myUser.niveau.numero)
              {
                chambre.affinite+=5;
              }
              if(position["etudiant"].cycle.label==myUser.cycle.label)
              {
                chambre.affinite+=3;
              }
            })
            chambre.affinite = (chambre.affinite/chambre.nbposition-1)/5;
          }
        })
      })
    });

  }

  showreservePage(chambre)
  {
    this.modalCtrl.create(ConfirmReservationPage, {"chambre":chambre}).present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  getUser()
  {
    this.nativeStorage.getItem('user')
      .then(
        data => {
          this.dataService.get('Etudiants/' + data["id"] + '?filter={"include":[{"option":"departement"},"cycle","niveau"]}')
            .then(
              user=>{
                this.user = user;
                this.initialisation();
              }
            );
          },
        error => console.error(error)
      );
  }

}
