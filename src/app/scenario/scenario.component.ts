import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Scenario } from '../scenario';
import { Responses } from '../response';
import { GeneratorService } from '../services/generator-service';
import { ResponseService } from '../services/response.service';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Next } from '../nextSteps';
import { generator } from '../generator';
@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,
    private generatorService: GeneratorService,private fb: FormBuilder,
  private responseService: ResponseService) { }

  private scenarioId : number;
  private scen: Scenario;
  drop: boolean = false;
  display: boolean = true;
  question: string ;
  options: number[] = [];
  dropdown: string[];
  scenario: string;
  form: FormGroup;
  finished: boolean;
  private next: Next;
  a0: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  middle: any;
  responses: Responses[] = [];


  ngOnInit() {
    //extract Id of Assets Chosen
    console.log("In Scenario");
    this.route.params
      .subscribe(
        (params: Params) => {
          this.a0 = +params['id'];
          this.a1 = +params['id1'];
          this.a2 = +params['id2'];
          this.a3 = +params['id3'];
          this.a4 = +params['id4'];
        }
      );


    //get Assets Chosen Array
    if(this.a0 != 0){
      this.options.push(this.a0);
    }
    if(this.a1 != 0){
      this.options.push(this.a1);
    }
    if(this.a2 != 0){
      this.options.push(this.a2);
    }
    if(this.a3 != 0){
      this.options.push(this.a3);
    }
    if(this.a4 != 0){
      this.options.push(this.a4);
    }

    //generate scenario, generate function round 2 -->coorsponds with scenario(choices, text) in js
    this.scenario = generator.generate(this.options, " ").text;
    localStorage.setItem('scenario', JSON.stringify(this.scenario));
    console.log(this.scenario);

    //generate default begining questions--> coorsponds with action() in js
    this.middle = generator.generate();
    console.log(this.middle);
    this.question = this.middle.text;
    console.log(this.question);
    this.dropdown = this.middle.list;
    console.log(this.dropdown);
    console.log(this.middle.end);
    if(this.dropdown.length > 0){
      this.drop = true;
    }

  this.initForm();

  }

  initForm(){

   let dDwn: string[];
   let quest: string = "";

    this.form = new FormGroup({
      'dDown': new FormControl(dDwn),
      'quest': new FormControl(quest, Validators.required),
    });
  }

  onSubmit(){

    console.log(this.form.value);
      let dDwnAns: number[] = [];

      //get form values
      let dDwn = this.form.value['dDown'];
      let questionAns = this.form.value['quest'];

      //update array of results
     const rToQ = {
     question: this.question,
     answer: questionAns,
     optionChosen: dDwn
    }

    this.responses.push(rToQ);
    console.log(this.responses);



      if(this.middle.end != true){
      //equate dropdown picked to index
      for(var k = 0; k < this.dropdown.length; k ++){
          if(this.dropdown[k] == dDwn){
            dDwnAns.push(k);
            break;
          }
      }
      console.log(dDwnAns);
    }
    //if get a response of end = true this is the last question
    if(this.middle.end == true){
      this.display = false;
      //send responses to local localStorage
      localStorage.setItem('responses', JSON.stringify(this.responses));
      this.form.reset();
      this.router.navigateByUrl('response');
    }
    //get the next set of question and response
    else{
      //turn back ot false before grabbing next part
      this.drop = false;

      //get next question should equate to one of the next 11 possible rounds
      this.middle = generator.generate(dDwnAns);
      console.log(this.middle);
      this.question = this.middle.text;
      console.log(this.question);
      this.dropdown = this.middle.list;
      console.log(this.dropdown);
      console.log(this.middle.end);
      if(this.middle.end != true){
      if(this.dropdown.length > 0){
        this.drop = true;
        }
      }
      if(this.middle.end == true){
          this.display = false;
          localStorage.setItem('responses', JSON.stringify(this.responses));
          this.form.reset();
          this.router.navigateByUrl('response');
        }
      }
    this.form.reset();
  }

}

//}
