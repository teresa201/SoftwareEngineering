import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Scenario } from '../scenario';
import { Responses } from '../response';
import { GeneratorService } from '../services/generator-service';
import { ResponseService } from '../services/response.service';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Next } from '../nextSteps';
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
  question: string ;
  options: String[];
  scenario: string;
  form: FormGroup;
  finished: boolean;
  private next: Next;


  ngOnInit() {
  
    console.log("Iin Scenario");
      this.generatorService.getScenario()
              .subscribe(result => {
                    //console.log(result);
                    this.scen = result;
                    if(this.scen.options.length > 0){
                      this.drop = true;
                    }
                    this.scenario = this.scen.s;
                    this.question = this.scen.question;
                    this.options = this.scen.options;
                    this.finished = this.scen.finished;
                    console.log(this.scen);
              });
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

    const newResponse = {
      dDwn: this.form.value['dDown'],
      question: this.form.value['quest']

    }

      this.responseService.addResponse(newResponse);
    if(this.finished){
      this.form.reset();
      this.router.navigateByUrl('response');
    }
    else{
      this.drop = false;
      this.generatorService.getNext()
              .subscribe(result => {
                    console.log(result);
                    this.next = result;
                    if(this.next.options.length > 0){
                      this.drop = true;
                    }
                    this.question = this.next.question;
                    this.options = this.next.options;
                    this.finished = this.next.finished;

              });
    this.form.reset();
    }

  }

}
