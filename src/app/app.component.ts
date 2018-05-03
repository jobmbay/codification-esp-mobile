import {Component, ViewChild, OnInit} from '@angular/core';
import {Nav, Platform, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {DataProvider} from "../providers/data/data";
import {LoginPage} from "../pages/login/login";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

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

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(private nativeStorage: NativeStorage, private dataService : DataProvider, private modalCtrl: ModalController, private dataProvider: DataProvider ,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

    ];

  }

  ngOnInit(){
    this.getUser();
  }

  getUser()
  {
    this.nativeStorage.getItem('user')
      .then(
        data => {
          //this.user = data;
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

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  deconnexion()
  {
    this.dataProvider.desconnected();
    let profileModal = this.modalCtrl.create(LoginPage);
    profileModal.present();
  }
}
