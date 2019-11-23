import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ModalModule } from './_modal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingModuleComponent } from './training-module/training-module.component';
import { ExtractionModuleComponent } from './extraction-module/extraction-module.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TabGroupExtractComponent } from './tab-group-extract/tab-group-extract.component';
import { BatchOrSingleComponent } from './batch-or-single/batch-or-single.component';
import { InvoiceTypeComponent } from './invoice-type/invoice-type.component';
import { StepperComponent } from './stepper/stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PdfUploaderComponent } from './extraction-module/pdf-uploader/pdf-uploader.component';
import { DragDropDirective } from './drag-drop.directive';
import { ToastrModule } from 'ngx-toastr';
import { UploadListComponent } from './upload-list/upload-list.component';
import {MatDialogModule} from "@angular/material";
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { TrainingUploaderComponent } from './training-uploader/training-uploader.component';
import { TrainingInformationComponent } from './training-information/training-information.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';
import { MarkedImagesComponent } from './marked-images/marked-images.component';
import { FilePreViewComponent } from './file-pre-view/file-pre-view.component';


@NgModule({
  declarations: [
    AppComponent,
    TrainingModuleComponent,
    ExtractionModuleComponent,
    HomeComponent,
    PageNotFoundComponent,
    TabGroupExtractComponent,
    BatchOrSingleComponent,
    InvoiceTypeComponent,
    StepperComponent,
    PdfUploaderComponent,
    DragDropDirective,
    UploadListComponent,
    InformationDialogComponent,
    TrainingUploaderComponent,
    TrainingInformationComponent,
    ImageCropperComponent,
    TemplatePreviewComponent,
    MarkedImagesComponent,
    FilePreViewComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ImageViewerModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    ModalModule
  ],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
    }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [InformationDialogComponent,TemplatePreviewComponent,FilePreViewComponent]
})
export class AppModule { }

