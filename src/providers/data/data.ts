import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {NativeStorage} from "@ionic-native/native-storage";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  baseUrl = "https://codification-esp-api.herokuapp.com/api/";

  constructor(private nativeStorage: NativeStorage, public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  get(url) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + url)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + "Etudiants/login?include=user", data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  post(url,data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + url, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  desconnected()
  {
    this.nativeStorage.remove('user')
      .then(
        data => {
          //this.modalCtrl.create(LoginPage).present();
        },
        error => console.error(error)
      );
  }

}
