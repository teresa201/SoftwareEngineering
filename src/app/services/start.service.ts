import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class StartService {
  private os: String[];
  constructor(private http: Http) {

  }

  getOperatingSystems(): Observable<String[]>{
    console.log("In OS fetching backend");
    return this.http.get('/api/os', JSON.stringify({}))
    .map((response: Response) => {
        this.os = response.json().String;
        console.log(this.os);
        return this.os;
    });
  }
}
