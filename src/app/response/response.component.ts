import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Scenario } from '../scenario';
import { Responses } from '../response';
import { GeneratorService } from '../services/generator-service';
import { ResponseService } from '../services/response.service';
import { NgForm,FormControl, NgModel, FormGroup, FormBuilder,Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute,
  private responseService: ResponseService) { }

  private responseId: number;
  private responses: Responses[];
  private scenario: string;

  @ViewChild('content') content: ElementRef;
  ngOnInit() {
    this.responses = JSON.parse(localStorage.getItem('responses'));
    this.scenario = JSON.parse(localStorage.getItem('scenario'));
  }

  downloadPDF(){
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width' : 190,
      'elementHandlers' : specialElementHandlers
    });

    doc.save('report.pdf');
  }
}
