import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import * as HighCharts from 'highcharts';


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

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let myChart = HighCharts.chart('container', {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: 'Chambre codifiées par étage'
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
        data: [
          ['Firefox', 45.0],
          ['IE', 26.8],
          {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true
          },
          ['Safari', 8.5],
          ['Opera', 6.2],
          ['Others', 0.7]
        ]
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
        text: 'Codification par département'
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
        data: [
          ['Firefox', 45.0],
          ['IE', 26.8],
          {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true
          },
          ['Safari', 8.5],
          ['Opera', 6.2],
          ['Others', 0.7]
        ]
      }]
    });

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
