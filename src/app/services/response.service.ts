import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Responses } from '../response';
import { Assets } from '../assets';
import 'rxjs/add/operator/map';

@Injectable()
export class ResponseService {
  private responses : Responses[];
  private assetsCh : Assets[];
  private r : Responses;
  private a : number[];
  constructor(private http: Http) {

  }

  addResponse(responses:Responses): Observable<Responses[]> {
            return this.http.post('/api/addResponse', responses)
            .map((response: Response) => {
                this.responses = response.json().responsez;
                return this.responses;
            });}

/*  addAssetsChosen(assets: Assets): Observable<Assets[]> {

              return this.http.post('/api/addAssets', assets)
              .map((response: Response) => {
                    this.assetsCh = response.json().assets;
                    return this.assetsCh;
                });}

  getAssetsChosen(id: number): Observable<number[]>{
            return this.http.get('/api/assets/' + id, JSON.stringify({}))
              .map((response: Response) => {
                  this.a = response.json().respon;
                  console.log(this.a);
                  return this.a;
              });
            }*/

}
