import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { FileNameService } from 'src/app/file-name.service';

@Component({
  selector: 'app-invoice-type',
  templateUrl: './invoice-type.component.html',
  styleUrls: ['./invoice-type.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class InvoiceTypeComponent implements OnInit {

  constructor(private route: Router,
              private fileNameService: FileNameService
    ){ }

  panelColor = new FormControl('red');

// constructor() { }
  selectedOption = "--select--";

    data:Array<Object> = [
      {id: 0, name: "AmeriHome"},
      {id: 1, name: "BoA"},
      {id: 2, name: "Caliber"},
      {id: 3, name: "Chase"},
      {id: 4, name: "Cenlar"},
      {id: 5, name: "Wells Fargo"},
      {id: 6, name: "Arvest Central Mortgage"},
      {id: 7, name: "BoA HELOC"},
      {id: 8, name: "BBVA Compass"},
      {id: 9, name: "Freedom Mortgage"},
      {id: 10, name: "Ditech"},
      {id: 11, name: "Dovenmuhle"},
    ];
   

  ngOnInit() {
  }

  selected(selectedOption) {
    this.selectedOption = selectedOption;
    this.fileNameService.fileType = this.selectedOption;
  }
  
}
