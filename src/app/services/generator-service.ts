import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Scenario } from '../scenario';
import 'rxjs/add/operator/map';

@Injectable()
export class GeneratorService {
  private scenario : Scenario;
  constructor(private http: Http) {

  }

  getScenario(id: number): Observable<Scenario>{
    return this.http.get('/api/scenario/' + id, JSON.stringify({}))
    .map((response: Response) => {
        this.scenario = response.json().scenario;
      //  console.log("generator");
      //  console.log(this.scenario);
        return this.scenario;
    });
  }
}
