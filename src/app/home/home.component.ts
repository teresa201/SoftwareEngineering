import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { StartService } from '../services/start.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private services : string[] ;
  private myOptions: IMultiSelectOption[] = [];
  private myOptionsF: IMultiSelectOption[];
  //private os : string = "";
  //private scenario: number;
  private serviceChosen: string[];
  constructor(private startService: StartService,private fb: FormBuilder,private router: Router) { }
  form: FormGroup;
  private k : number = 1;

  ngOnInit() {
    //logic needs to wait until services are returned
    this.startService.getServices()
              .subscribe(result => {
                    this.services = result;
                    console.log(this.services);
                    for(let itm of this.services){
                      let tmp: IMultiSelectOption = { id: this.k, name: itm};
                      this.myOptions.push(tmp);
                      this.k++;
                    }
                    console.log(this.myOptions);
                    this.myOptionsF = this.myOptions;
                    this.initForm();
              });

  }

  private initForm() {

    let sChosen: string[];

    this.form = new FormGroup({
      'sChosen': new FormControl(sChosen, Validators.required),
    });
    console.log("initForm done");
  }


  onSubmit(){
    console.log(this.form.value);
    this.serviceChosen = this.form.controls['sChosen'].value;
    console.log(this.serviceChosen);
    this.router.navigateByUrl('scenario');
    }

}
