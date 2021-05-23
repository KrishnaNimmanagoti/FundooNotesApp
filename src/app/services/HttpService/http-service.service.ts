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
  post(url: string, data: any) {
    return this.http.post(this.BaseUrl + url, data);
  }
}
