import { Component, OnInit } from '@angular/core';
import { ServeB64imagesService } from '../serve-b64images.service';


@Component({
  selector: 'app-training-module',
  templateUrl: './training-module.component.html',
  styleUrls: ['./training-module.component.css']
})
export class TrainingModuleComponent implements OnInit {


  constructor(
    private serveImages:ServeB64imagesService) { }

  ngOnInit() {
  }
 
}
