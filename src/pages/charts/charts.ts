import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import * as Highcharts from 'highcharts';

/**
 * Generated class for the ChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  batiments :any;

  constructor(private dataService:DataProvider, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  dismiss()
  {
    this.viewCtrl.dismiss();
  }

  ngOnInit()
  {
    this.initialize();
  }

  initialize()
  {
    this.dataService.get('Batiments?filter=' + encodeURIComponent('{"include": {"etages": {"chambres":"positions"}}}'))
      .then(
        data=>{
          this.batiments = data;
          this.batiments.charts=[];
          this.batiments.chartspie=[];
          let batiments= this.batiments;
          this.batiments.forEach(function (batiment) {
            batiment.nbetudiant = 0;
            batiment.nbcodification = 0;
            batiment.nbchambre = 0;
            batiment.nbposition = 0;
            batiment.nbtotalposition = 0;
            batiment.nbreservation = 0;
            batiments.charts.push({name:batiment.label, data:[]});
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
              batiments.charts[batiments.charts.length-1].data.push(etage.nbtotalposition-etage.nbposition);
            });
            batiments.chartspie.push([batiment.label, batiment.nbtotalposition-batiment.nbposition]);
          });
          console.log(this.batiments);
          this.getCharts();
        },
        err=>{
          console.log(err);
        }
      );
  }

  getCharts()
  {
    let myChart = Highcharts.chart('container', {
      title: {
        text: 'Nombre de chambres restants par etage'
      },

      subtitle: {
        text: 'Les statistiques sont a temps réel'
      },

      yAxis: {
        title: {
          text: 'Nombre de chambres restant'
        }
      },
      xAxis: {
        title: {
          text: 'Etage'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {

      },

      series: this.batiments.charts,

    });

    Highcharts.chart('pardepart', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Nombre de position restant par batiment dans chaque etage'
      },
      xAxis: {
        title: {
          text: 'Etage'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Nombre de chambre restant par batiment'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -15,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: 'white'
          }
        }
      },
      series: this.batiments.charts
    });

    Highcharts.chart('pie', {

      title: {
        text: 'Diagramme circulaire des chambres restant par batiment'
      },

      xAxis: {
        title: {
          text: 'etage'
        },
      },

      series: [{
        type: 'pie',
        data: this.batiments.chartspie
      }]
    });

    Highcharts.chart('column', {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25
        }
      },
      title: {
        text: 'Histogramme'
      },
      subtitle: {

      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Nombre de chambre restant par batiment'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {

      },
      plotOptions: {
        column: {
          depth: 50
        }
      },
      series: [{
        name: 'Nombre de chambre',
        data: this.batiments.chartspie
      }]
    });
  }

}
