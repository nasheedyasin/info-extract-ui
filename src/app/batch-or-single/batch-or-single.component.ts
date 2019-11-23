import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-batch-or-single',
  templateUrl: './batch-or-single.component.html',
  styleUrls: ['./batch-or-single.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BatchOrSingleComponent implements OnInit {
  panelColor = new FormControl('red');
  constructor(
              
    ) { }
  selectedOption = "--select--";
  data:Array<Object> = [
    {id: 0, name: "Single Upload"},
    {id: 1, name: "Batch Upload"}
  ];
  ngOnInit() {
  }
  selected(selectedOption) {
    this.selectedOption = selectedOption;
    
  }


}
