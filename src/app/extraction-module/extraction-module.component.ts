import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-extraction-module',
  templateUrl: './extraction-module.component.html',
  styleUrls: ['./extraction-module.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExtractionModuleComponent implements OnInit {

  hideStepper: boolean;
  constructor() { }
  
  ngOnInit() {
    this.hideStepper = false;
  }
  stepperStateChange(hideFlag: boolean){
    this.hideStepper = hideFlag;
  }

}
