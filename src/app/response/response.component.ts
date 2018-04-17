import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Scenario } from '../scenario';
import { Responses } from '../response';
import { GeneratorService } from '../services/generator-service';
import { ResponseService } from '../services/response.service';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,
  private responseService: ResponseService) { }

  private responseId: number;
  private respon: Responses;

  ngOnInit() {
    /*this.route.params
      .subscribe(
        (params: Params) => {
          this.responseId = +params['rid'];
          console.log(this.responseId );

        }
      );*/

    /*  this.responseService.getResponse(this.responseId)
              .subscribe(result => {
                    //console.log(result);
                    this.respon = result;
                    console.log(this.respon);
              });

}*/
}
}
