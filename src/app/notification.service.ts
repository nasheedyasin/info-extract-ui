import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}
    
    showSuccess(message, title){
      this.toastr.success(message, title);
      

  }
}
