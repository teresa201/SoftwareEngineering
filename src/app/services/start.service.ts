import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class StartService {
  private services: string[];
  constructor(private http: Http) {

  }

  getServices(): Observable<string[]>{
    console.log("In OS fetching backend");
    return this.http.get('/api/services', JSON.stringify({}))
    .map((response: Response) => {
        this.services = response.json().String;
        console.log(this.services);
        return this.services;
    });
  }
}
