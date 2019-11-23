import { MatDialog, MatDialogConfig } from '@angular/material';
import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import Cropper from "cropperjs";
import { HttpClient } from '@angular/common/http';
import { ImageDetails } from "./image-details"
import { TemplatePreviewComponent } from '../template-preview/template-preview.component';
import { TemplateUrlService } from '../template-url.service';
import { NotificationService } from '../notification.service';
import { ServeB64imagesService } from '../serve-b64images.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileNameService } from '../file-name.service';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit, AfterViewInit {

    @ViewChild("image", { static: false })
    public imageElement: ElementRef;

    public imageSource: any;

    public pageNumber:number;

    public imgWidth: number;
    public imgHeight: number;
    public imageDestination: string;
    public base64: string;
    private cropper: Cropper;
    public regEx:any="/^[A-Z]+$/i";
    pageURLs: any[] = [];

    vendorName:string;
    formData = new FormData();

    imageDetails:ImageDetails;
    imageDetailsList:ImageDetails[];

    public constructor(
              private http : HttpClient,
              private dialog:MatDialog,
              private templateUrl:TemplateUrlService,
              private notification:NotificationService,
              private serveImages:ServeB64imagesService,
              private _sanitizer: DomSanitizer,
              private fileNameService: FileNameService
    ) {
        
    }

    ngOnInit() { 

        this.sanitizeURLs( this.serveImages.B64Images);
        this.vendorName = this.fileNameService.fileType;
        this.pageNumber = 0;
        this.imageDestination = "";
        this.imageDetails = {ImageName : "", ImageDataURL : "", ImgH:0, ImgW:0}
        this.imageSource = this.pageURLs[this.pageNumber];
        this.initTemplateList();


    }

    public ngAfterViewInit() {
        
    }


    renderCropper(){ 
        this.cropper = new Cropper(this.imageElement.nativeElement, {
          zoomable: true,
          scalable: false,
          aspectRatio: 0,
          autoCrop:false,
          autoCropArea: 0.0,
          crop: () => {
              const canvas = this.cropper.getCroppedCanvas();
              this.imgWidth = canvas.width;
              this.imgHeight = canvas.height;
              this.imageDestination = canvas.toDataURL("image/png");
          }
      });
    }
    clearCroppedZones(){
      this.imageDetailsList = [];
    }
    clearCropper(){
      this.cropper.reset();
      this.cropper.clear();
    }
    public convToJPG(imageDetails:ImageDetails)
    {

      const imageName = imageDetails.ImageName +'.jpg';
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(imageDetails.ImageDataURL);
      const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

      this.formData.append(imageName,imageFile);

    }

    addtoImgList(){
        this.imageDetails.ImageDataURL = this.imageDestination;
        this.imageDetails.ImgH = this.imgHeight;
        this.imageDetails.ImgW = this.imgWidth;
        this.imageDetailsList.push(this.imageDetails);
        this.imageDetails = {ImageName : "", ImageDataURL : "", ImgH:0, ImgW:0};
        this.clearCropper();
    }


    uploadTemplates(){
        if (this.imageDetailsList.length === 0) {
            return;
          }
        
        // Conveying the type of input invoice 
        this.formData.append("FileType",this.vendorName)
        this.imageDetailsList.forEach(element => { this.convToJPG(element); });

        this.http.post<any>("http://localhost:2136/api/upload/images", this.formData).subscribe(
        (data: any) => { 
            this.notification.showSuccess("Trained successfully","Invoice Template Status:");
            this.serveImages.B64Images = null;
      }
    ); 
         
    }


    public dataURItoBlob(dataURI) 
    {
      this.base64 = dataURI.substr(22);
      const byteString = window.atob(this.base64);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });    
      return blob;
   }

   removeTemplate(idx){
    this.imageDetailsList.splice(idx, 1);
   }

   imagePreview(template)
  {

    this.templateUrl.templateDetails=template;
    const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;

          this.dialog.open(TemplatePreviewComponent, {
            height: '400px',
            width: '1000px',
          });
  }
  incrementPage(){
    
    if (this.pageNumber == this.pageURLs.length-1){
      return;
    }

    this.cropper.destroy();

    Cropper.noConflict();
    this.pageNumber++ ;
    // Updating the cropper URL

    this.imageSource = this.pageURLs[this.pageNumber];

  }
  decrementPage(){


    if (this.pageNumber == 0){
      return
    }
    this.cropper.destroy();
    
    Cropper.noConflict();
    this.pageNumber--;

    this.imageSource = this.pageURLs[this.pageNumber];

  }

  sanitizeURLs(imgURL: any[]){

    imgURL.forEach(element => {
        this.pageURLs.push(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + element));
      });
  }

  initTemplateList(){
    this.imageDetailsList = [];
    const templateDict = this.serveImages.B64TemplateInfo
    for(let key in templateDict){
        const URL = 'data:image/jpg;base64,' + templateDict[key];
        const entityName = key;
        this.imageDetailsList.push({ImageName : entityName, ImageDataURL : URL, ImgH:100, ImgW:100});
    }

  }
}