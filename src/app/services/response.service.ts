import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Responses } from '../response';
import 'rxjs/add/operator/map';

@Injectable()
export class ResponseService {
  private responses : Responses[];
  private r : Responses;
  constructor(private http: Http) {

  }

  addResponse(responses:Responses): Observable<Responses[]> {
            return this.http.post('/api/addResponse', responses)
            .map((response: Response) => {
                this.responses = response.json().responsez;
                return this.responses;
            });}

  getResponse(id: number): Observable<Responses>{
            return this.http.get('/api/response/' + id, JSON.stringify({}))
              .map((response: Response) => {
                  this.r = response.json().respon;
                  console.log(this.r);
                  return this.r;
              });
            }

}
