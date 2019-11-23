import { Component, OnInit } from '@angular/core';
import { TemplateUrlService } from '../template-url.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent implements OnInit {

  constructor(
            private templateServiceObj:TemplateUrlService,
            public dialogRef: MatDialogRef<TemplatePreviewComponent>
  ) { }
  public imgUrl:string;
  public imgName:string;
  ngOnInit() {
    this.imgUrl = this.templateServiceObj.templateDetails.ImageDataURL;
    this.imgName = this.templateServiceObj.templateDetails.ImageName;

  }

  close() {
    //window.URL.revokeObjectURL(this.data.fileData);
    this.dialogRef.close();
  }

}
