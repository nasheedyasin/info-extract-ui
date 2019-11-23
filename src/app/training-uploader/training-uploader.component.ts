import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/notification.service';
import { FileNameService } from 'src/app/file-name.service';
import { ServeB64imagesService } from '../serve-b64images.service';
import { MatDialog } from '@angular/material';
import { FilePreViewComponent } from '../file-pre-view/file-pre-view.component';
import { FileData } from '../extraction-module/pdf-uploader/pdf-uploader.component';

export interface FilePreviewData {
  fileName: string,
  fileData: any;
}

@Component({
  selector: 'app-training-uploader',
  templateUrl: './training-uploader.component.html',
  styleUrls: ['./training-uploader.component.scss'],
})
export class TrainingUploaderComponent implements OnInit {

  showSpinner:boolean;
  pdfURL: string = "";

  fileType: string;
  myJson = {
    "FileName":"",
    "FileType":""
  }

  fileCollection: FileData[];

  constructor(
    private http: HttpClient,
    private notifyService : NotificationService,
    private fileNameService: FileNameService,
    private serveImages: ServeB64imagesService,
    private dialog: MatDialog
    ) { 
      this.showSpinner = false;
    }

    ngOnInit() {
      this.fileType = this.fileNameService.fileType;
      this.fileCollection = [];
    }
    sendFiles (){ 
      if (this.fileCollection.length === 0) {
        return;
      }

      this.showSpinner = true;
      this.fileType = this.fileNameService.fileType;
      this.myJson = {
        "FileName":this.fileCollection[0].fileName,
        "FileType":this.fileNameService.fileType
      }
      const formData = new FormData();
      
      for (let file of this.fileCollection) {
        formData.append(file.fileName, file.fileData);
      }
  
      this.http.post("http://faiblr04w13677/SIMSservice/api/upload/files", formData).subscribe(
          () => {
            // change the IP when in office
            // Home IP: 192.168.0.102
            // Office IP: 172.23.179.252/ 172.23.115.77 / 172.23.179.17
            this.http.post("http://172.23.114.23:5000/api/GetTemplates",this.myJson).subscribe(
                 (data: any) => {
                  this.serveImages.B64TemplateInfo = data["Base64Templates"];
                  this.http.post("http://172.23.114.23:5000/api/GetTrainingImgs",this.myJson).subscribe(
                            (data: any) => {
                              this.serveImages.B64Images = data["Base64Imgs"];
                              this.notifyService.showSuccess("Ready for Cropping", "Invoice Template Status:");
                            }
                          );

  }
);

          });
        
     
    }
  
    uploadFile(event) {
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.fileCollection.push({fileName:element.name.split('.')[0],fileData:element})
        //this.fileNameService.fileName.push(element.name);
      }  
      this.fileNameService.fileCollection = this.fileCollection;

      
    }

    deleteAttachment(index) {
      this.fileCollection.splice(index, 1);
      this.fileNameService.fileCollection = this.fileCollection;
    }

    filePreview(id: number)
        {

          this.pdfURL = window.URL.createObjectURL(this.fileCollection[id].fileData);
          

          this.dialog.open(FilePreViewComponent, {
            height: '98%',
            width: '88%',
            panelClass: 'full-screen-modal',
            data:{fileName: this.fileCollection[id].fileName, fileData: this.pdfURL},
            autoFocus: true
          });
        }

}



