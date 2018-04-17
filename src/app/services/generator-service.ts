import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Scenario } from '../scenario';
import { Next } from '../nextSteps';
import 'rxjs/add/operator/map';

@Injectable()
export class GeneratorService {
  private scenario : Scenario;
  private next : Next;
  constructor(private http: Http) {

  }

  getScenario(): Observable<Scenario>{
    return this.http.get('/api/scenario', JSON.stringify({}))
    .map((response: Response) => {
        this.scenario = response.json().scenario;
      //  console.log("generator");
      //  console.log(this.scenario);
        return this.scenario;
    });
  }

  getNext(): Observable<Next>{
    return this.http.get('/api/next', JSON.stringify({}))
    .map((response: Response) => {
        this.next = response.json().scenario;
      //  console.log("generator");
      //  console.log(this.scenario);
        return this.next;
    });
  }
}
