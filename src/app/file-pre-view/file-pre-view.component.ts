import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {  FilePreviewData } from '../training-uploader/training-uploader.component';

@Component({
  selector: 'app-file-pre-view',
  templateUrl: './file-pre-view.component.html',
  styleUrls: ['./file-pre-view.component.scss']
})
export class FilePreViewComponent {

  
  constructor(public dialogRef: MatDialogRef<FilePreViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FilePreviewData
    ) { }

  // ngOnInit() {
  // }
  close() {
    window.URL.revokeObjectURL(this.data.fileData);
    this.dialogRef.close();
  }
}
