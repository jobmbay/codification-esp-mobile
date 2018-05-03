import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import * as HighCharts from 'highcharts';
import {DataProvider} from "../../providers/data/data";


//require('highcharts-3d');

/**
 * Generated class for the PavillonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pavillon',
  templateUrl: 'pavillon.html',
})
export class PavillonPage {

  batimentId:any;
  batiment={
    id:"",
    label:"",
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
      label:""
    }]
  };

  myChart;

  constructor(private dataService: DataProvider, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.initialize();
  }

  ionViewDidLoad() {

  }

  initialize()
  {
    this.batimentId = this.navParams.get('batimentId');
    console.log("AAAAAAAAAAAAAA",this.batimentId)
    this.dataService.get('Batiments/' + this.batimentId + '?filter=' + encodeURIComponent('{"include": {"etages": {"chambres":"positions"}}}'))
      .then(
        data=>{
          this.batiment = data;
          this.batiment.nbetudiant = 0;
          this.batiment.nbcodification = 0;
          this.batiment.nbchambre = 0;
          this.batiment.nbposition = 0;
          this.batiment.nbtotalposition = 0;
          this.batiment.nbreservation = 0;
          this.batiment.charts = [];
          let batiment = this.batiment;
          this.batiment.etages.forEach(function (etage) {
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
              batiment.charts.push({name:"Etage "+etage.numero, y:etage.nbtotalposition - etage.nbposition});
            });
          console.log(this.batiment.charts);
          this.getCharts();
        },
        err=>{
          console.log(err);
        }
      );
  }

  getCharts()
  {
    this.myChart = HighCharts.chart('container', {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: 'Chambre restant par étage'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: this.batiment.charts
      }]
    });

    let parDepart = HighCharts.chart('pardepart', {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: 'Chambre restant par étage'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        column: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        type: 'column',
        name: 'Browser share',
        data: this.batiment.charts
      }]
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
