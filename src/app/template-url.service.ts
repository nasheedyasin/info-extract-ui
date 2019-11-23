import { Injectable } from '@angular/core';
import { ImageDetails } from './image-cropper/image-details';

@Injectable({
  providedIn: 'root'
})
export class TemplateUrlService {
  templateDetails:ImageDetails;
  constructor() { }
}
