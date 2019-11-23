import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadStatus } from './upload-status'
import { FileNameService } from 'src/app/file-name.service';
import { MatDialog } from '@angular/material';
import { FilePreViewComponent } from 'src/app/file-pre-view/file-pre-view.component';

import { NotificationService } from 'src/app/notification.service';
import { ModalService } from 'src/app/_modal';

export interface FileData {
  fileName: string,
  fileData: any;
}

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.scss'],
  
})
export class PdfUploaderComponent implements OnInit {

  progress: number;
  status: UploadStatus;
  pdfURL: string;

  fileCollection: FileData[];
  
  @Output() hideStepper: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private notifyService : NotificationService,
    private fileNameService: FileNameService,
    private dialog: MatDialog,
    private modalService: ModalService
    ) { }

  ngOnInit() {
    this.fileCollection = [];

  }
  sendFiles (){ 
    
    if (this.fileCollection.length === 0) {
      return;
    }
   
    const formData = new FormData();
    
    for (let file of this.fileCollection) {
      formData.append(file.fileName, file.fileData);
    }

    this.http.post<any>("http://localhost:2136/api/upload/files", formData).subscribe(
        () => { 
                  this.notifyService.showSuccess("File uploaded successfully", "Notification"); 
                  this.hideStepper.emit(true);
                }
      
    );
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.fileCollection.push({fileName:element.name.split('.')[0],fileData:element})
    }  
    this.fileNameService.fileCollection = this.fileCollection;
  }
  deleteAttachment(index) {
    this.fileCollection.splice(index,1)
    this.fileNameService.fileCollection = this.fileCollection;
  }
  

  filePreview(id: number)
        {

          this.pdfURL = window.URL.createObjectURL(this.fileCollection[id].fileData);
          // this.modalService.open(id);


          this.dialog.open(FilePreViewComponent, {
            height: '98%',
            width: '88%',
            panelClass: 'full-screen-modal',
            data:{fileName: this.fileCollection[id].fileName, fileData: this.pdfURL},
            autoFocus: true
          });
        }

}
