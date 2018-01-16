import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post("https://codification-esp-api.herokuapp.com/api/Etudiants/login?include=user", data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  setUser(user)
  {
    let userStringify = JSON.stringify(user);
    localStorage.setItem("userAccount",userStringify);
  }

  getUser()
  {
    return JSON.parse(localStorage.getItem("userAccount"));
  }


  setTocken(token)
  {
    localStorage.setItem("tocken",token);
  }

  getTocken()
  {
    return localStorage.getItem("tocken");
  }

  isConnected()
  {
    if(localStorage.getItem("tocken"))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  deconnect()
  {
    localStorage.removeItem("tocken");
  }

}
