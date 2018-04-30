import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { StartService } from '../services/start.service';
import { ResponseService } from '../services/response.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Assets } from '../assets';
import { generator } from '../generator';

//declare  var generator: any;
//const example = require('../assets/javascript/test');
//let index = 0;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ]
})
export class HomeComponent implements OnInit {
//  index = 0;
  private services : string[] ;
  private myOptions: IMultiSelectOption[] = [];
  private myOptionsF: IMultiSelectOption[];
  //index = 0;
  //private os : string = "";
  //private scenario: number;
  private serviceChosen: number[];
  constructor(private startService: StartService,private fb: FormBuilder,
    private responseService: ResponseService,private router: Router) { }
  form: FormGroup;
  private k : number = 1;
  private asset: Assets;
  private aId: number = 0;
  private aId1: number = 0;
  private aId2: number = 0;
  private aId3: number = 0;
  private aId4: number = 0;

  ngOnInit() {



   //gets services from the javascript file using setup method
   //populates generator
  // this.services = generator.setup().list;
    //console.log()
    this.services = generator.generate().list; //coorsponds to callin setup in js
    console.log(this.services);
    for(let itm of this.services){
      let tmp: IMultiSelectOption = { id: this.k, name: itm};
      this.myOptions.push(tmp);
      this.k++;
    }
    console.log(this.myOptions);
    this.myOptionsF = this.myOptions;
    this.initForm();

  }

  private initForm() {

    let sChosen: string[];

    this.form = new FormGroup({
      'sChosen': new FormControl(sChosen, Validators.required),
    });
    console.log("initForm done");
  }

//need to pass the services chosen to the scenario endpoint
//could use the mock db upload the array and pass the ID number of the ID to the
//parameter....that is the id it needs to grab

  onSubmit(){
    console.log(this.form.value);
    this.serviceChosen = this.form.controls['sChosen'].value;
    console.log(this.serviceChosen);

    for(let i = 0; i < this.serviceChosen.length; i++){
      if(this.serviceChosen[i] == 1){
        this.aId  = 1;
      }
      else if(this.serviceChosen[i] == 2){
        this.aId1  = 2;
      }
      else if(this.serviceChosen[i] == 3){
        this.aId2  = 3;
      }
      else if(this.serviceChosen[i] == 4){
        this.aId3  = 4;
      }
      else if(this.serviceChosen[i] == 5){
        this.aId4  = 5;
      }
    }
    this.router.navigate(['/scenario', this.aId, this.aId1, this.aId2, this.aId3, this.aId4]);
    }

}
