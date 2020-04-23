import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomToastrService } from '../service/toastr/custom-toastr.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomHttpInterceptor implements HttpInterceptor {

    static toastr;
    static router;

    constructor(public toastrService: CustomToastrService, public router: Router) {
        CustomHttpInterceptor.toastr = toastrService;
        CustomHttpInterceptor.router = router;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');

        let modifiedReq = req;

        if (token) {
            modifiedReq = modifiedReq.clone({
                headers: modifiedReq.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        return next.handle(modifiedReq).pipe(catchError(this.handleError));
    }

    handleError(err: HttpErrorResponse) {
        console.log(err);
        if (err.status === 403) {
            localStorage.clear();
            CustomHttpInterceptor.toastr.showError('Session expired! Please login again');
            CustomHttpInterceptor.router.navigateByUrl('/login');
        } else {
            CustomHttpInterceptor.toastr.showError(err.error && err.error.message ? err.error.message : 'An unknown error occured');
        }
        return throwError(err);
    }

}