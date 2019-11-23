import { Component, OnInit } from '@angular/core';

import { ExtractedInformationService } from '../extracted-information.service';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.scss']
})
export class InformationDialogComponent implements OnInit {

  constructor(
              private extractedInformation : ExtractedInformationService,
              private notifyService : NotificationService,
               ) { 
               }

  infoExtracted :any;
  b64MarkedImages:string[];

  filterApplied:string;
  imageSource:string[];

  fileName:string;

  ngOnInit() {
          this.fileName = this.extractedInformation.fileName;
          this.infoExtracted = this.extractedInformation.extractedData;
          this.b64MarkedImages = this.extractedInformation.b64MarkedImages;
          this.imageSource = this.b64MarkedImages;
          this.filterApplied = null;
  }
  applyFilter(templateName: string){
    this.filterApplied = templateName;
    const newSource = [];
    newSource.push(this.infoExtracted[templateName][1]);
    this.imageSource = newSource;
  }
  resetFilter(){
    this.filterApplied = null;
    this.imageSource = this.b64MarkedImages;
    this.notifyService.showSuccess("Filter Reset","")

  }

  returnToList(){
    this.extractedInformation.extractedData = null;
    this.extractedInformation.b64MarkedImages = null;
  }

  // stayHere(id: string){
  //   this.modalService.close(id);
  // }

}
