import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Scenario } from '../scenario';
import { Responses } from '../response';
import { GeneratorService } from '../services/generator-service';
import { ResponseService } from '../services/response.service';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';

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
  private scenario: Scenario;
  form: FormGroup;
  private nextId = 1;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.scenarioId = +params['sid'];
          console.log(this.scenarioId );

        }
      );
      this.generatorService.getScenario(this.scenarioId)
              .subscribe(result => {
                    //console.log(result);
                    this.scenario = result;
                    console.log(this.scenario);
              });
  this.initForm();

  }

  initForm(){
    let iD = '';
    let cE = '';
    let rec = '';
    let fU = '';



    this.form = new FormGroup({
      'iD': new FormControl(iD, Validators.required),
      'cE': new FormControl(cE, Validators.required),
      'rec': new FormControl(rec, Validators.required),
      'fU': new FormControl(fU, Validators.required),
    });
  }

  onSubmit(){
    console.log(this.form.value);

    const newResponse = {
      scnID: this.scenarioId,
      responseId: this.nextId,
      iD: this.form.value['iD'],
      cE: this.form.value['cE'],
      recover: this.form.value['rec'],
      fU: this.form.value['fU'],

    }
      //console.log(newListing);
      this.nextId++;
      this.responseService.addResponse(newResponse);
      this.form.reset();
      let pre = this.nextId -1;
      this.router.navigateByUrl('/response/' + pre );

    //  this.router.navigateByUrl('');
    //  this.router.navigateByUrl('/dash/' + this.projectId);

    }

}
