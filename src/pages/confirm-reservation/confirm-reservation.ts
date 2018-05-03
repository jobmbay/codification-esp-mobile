import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the ConfirmReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-reservation',
  templateUrl: 'confirm-reservation.html',
})
export class ConfirmReservationPage implements OnInit{

  chambre = {
    id:"",
    positions:[{
      id:"",
      etudiant:{
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
      }
    }]
  };
  pet;

  exite = false;

  currentEtudiant = {
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

  constructor(private nativeStorage : NativeStorage,private toastCtrl: ToastController, private viewCtrl : ViewController, private dataService : DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    let urlToChangeStream1 = 'https://codification-esp-api.herokuapp.com/api/Positions/change-stream?_format=event-stream';
    let src1 = new window['EventSource'](urlToChangeStream1);
    src1.addEventListener('data', function(msg) {
      let data = JSON.parse(msg.data);
      if(document.getElementById("confirmReservation"))
      document.getElementById("confirmReservation").click();
      console.log("realtime",data); // the change object
    });
  }

  ngOnInit()
  {
    this.chambre = this.navParams.get("chambre");
    if(this.chambre.positions[0]){
      this.pet=this.chambre.positions[0].id;
    }
    this.getUser();
  }

  reloadChambre(){
    this.dataService.get('Chambres/' + this.chambre.id + '?filter={"positions":{"etudiant":[{"option":"departement"},"cycle","niveau"]}}')
      .then(
        chambre=>{
          this.chambre = chambre;
        }
      );
  }

  ionViewDidLoad() {

  }

  getCurrentEtudiant(etudiant)
  {
    this.currentEtudiant = etudiant;
  }

  chooseRoom(room, batiment)
  {
    this.chambre = room;
    this.chambre["batiment"]= batiment.label;
    if(this.chambre["positions"][0])
    {
      this.exite = true;
      this.currentEtudiant = this.chambre["positions"][0].etudiant;
    }
    else
    {
      this.exite = false;
    }
  }

  reserver()
  {
    if(this.chambre.positions.length<this.chambre["nbposition"])
    {
      this.dataService.get("Positions/count?where=" + encodeURIComponent('{"etudiantId":"'+ this.user.id +'"}'))
        .then(
          nbCodef=>{
            if(nbCodef.count==0)
            {
              this.dataService.post("Positions",{numero:this.chambre.positions.length+1, chambreId: this.chambre["id"], etudiantId: this.user.id , status:"reservation"})
                .then(
                  data=>{this.presentToast("Votre réservation a été bien tenu en compte");
                  this.reloadChambre();
                    this.dismiss();

                    /*this.dataService.get('Positions?filter={"include":{"etudiant":[{"option":"departement"},"cycle","niveau"]}}')
                      .then(
                        positions=>{
                          this.chambre.positions=positions;
                          document.getElementById("initializeAll").click();

                        }
                      );*/


                  },
                  err=>{
                    console.log(err);
                  }
                );
            }
            else {
              this.presentToast("Désolé vous vous etes déja codifier, Si la chambre que vous avez ne vous plaisez pas vous pouvez echanger de chambre avec votre téléphone mobile")
            }
          }
        )
    }
    else {
      this.presentToast("Désolé la chambre est déja pleine, veuillez chercher une autre chambre");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
              }
            );
        },
        error => console.error(error)
      );
  }

}
