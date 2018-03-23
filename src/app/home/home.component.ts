import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StartService } from '../services/start.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private os : String[] ;
  constructor(private startService: StartService) { }

  ngOnInit() {
    //  console.log(this.os);
    this.startService.getOperatingSystems()
              .subscribe(result => {
                    console.log("get result");
                    this.os = result;
                    console.log(this.os);
              });
  }

}
