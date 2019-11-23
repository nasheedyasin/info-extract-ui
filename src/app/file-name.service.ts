import { Injectable } from '@angular/core';
import { FileData } from './extraction-module/pdf-uploader/pdf-uploader.component';

@Injectable({
  providedIn: 'root'
})
export class FileNameService {

fileCollection: FileData[]; 
fileType: string;
  constructor() { }
}
