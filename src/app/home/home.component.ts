import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { StartService } from '../services/start.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private osOptions : string[] ;
  private os : string = "";
  private scenario: number;

  constructor(private startService: StartService,private fb: FormBuilder,private router: Router) { }
  form: FormGroup;
  ngOnInit() {
    this.startService.getOperatingSystems()
              .subscribe(result => {
                    this.osOptions = result;
                    console.log(this.osOptions);
              });
  this.initForm();

  }

  private initForm() {
    let osChosen = '';

    this.form = new FormGroup({
      'osChosen': new FormControl(osChosen, Validators.required),
    });
  }

  onSubmit(){
    console.log(this.form.value);
    this.os = this.form.controls['osChosen'].value;
    console.log(this.os);

    //randomly choose Scenario Mac: 1-3 Unix 4-6 Linux 9-12 ubuntu 6-9
    //Math.floor(Math.random() * (max - min + 1)) + min;
    if(this.os == "Mac OS X"){
      console.log("in");
      this.scenario = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    }
    else if(this.os == "Unix"){
      this.scenario =  Math.floor(Math.random() * (6 - 4 + 1)) + 4;
    }
    else if(this.os == "Linux"){
      this.scenario = Math.floor(Math.random() * (12 - 9 + 1)) + 9;
    }
    else if(this.os == "Ubuntu"){
      this.scenario =  Math.floor(Math.random() * (9 - 6 + 1)) + 6;
    }
    console.log(this.scenario);
      this.form.reset();
    //  this.router.navigateByUrl('/dash/' + this.posterId);

    }

    isReady(){
      let isReady = false;
      if (this.os != ""){
        isReady = true;
      }
      return isReady;
    }
    onGenerate(){
      this.router.navigateByUrl('/scenario/' + this.scenario);
    }
}
