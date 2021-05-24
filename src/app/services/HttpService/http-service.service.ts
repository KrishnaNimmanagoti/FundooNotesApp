import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  BaseUrl = environment.baseUrl

  constructor(private http: HttpClient) {

  }
  token: any;
  post(url: string, data: any){
    this.token=localStorage.getItem('token')
    console.log("the toke is:" ,this.token);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       'Authorization' : this.token
        
      })
    }

    console.log("data in http ", data);
    console.log( this.BaseUrl);

    return this.http.post(this.BaseUrl + url,data,options);
  }
}
