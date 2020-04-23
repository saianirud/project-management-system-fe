import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export enum ToastrPositionClass {
  ToastCenterCenter = 'toast-center-center',
  ToastTopCenter = 'toast-top-center',
  ToastBottomCenter = 'toast-bottom-center',
  ToastTopLeft = 'toast-top-left',
  ToastTopRight = 'toast-top-right',
  ToastBottomLeft = 'toast-bottom-left',
  ToastBottomRight = 'toast-bottom-right',
}

@Injectable({
  providedIn: 'root'
})

export class CustomToastrService {

  private DEFAULT_TIMEOUT = 3000;

  constructor(private toastr: ToastrService) { }

  showSuccess(message, timeout = this.DEFAULT_TIMEOUT, positionClass = ToastrPositionClass.ToastTopCenter, title?) {
    this.toastr.success(message, title, {
      positionClass: positionClass,
      timeOut: timeout
    });
  }

  showError(message, timeout = this.DEFAULT_TIMEOUT, positionClass = ToastrPositionClass.ToastTopCenter, title?) {
    this.toastr.error(message, title, {
      positionClass: positionClass,
      timeOut: timeout
    });
  }

  showWarning(message, timeout = this.DEFAULT_TIMEOUT, positionClass = ToastrPositionClass.ToastTopCenter, title?) {
    this.toastr.warning(message, title, {
      positionClass: positionClass,
      timeOut: timeout
    });
  }

  showInfo(message, timeout = this.DEFAULT_TIMEOUT, positionClass = ToastrPositionClass.ToastTopCenter, title?) {
    this.toastr.info(message, title, {
      positionClass: positionClass,
      timeOut: timeout
    });
  }
}
