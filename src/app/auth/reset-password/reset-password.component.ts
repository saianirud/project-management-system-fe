import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public passwordResetToken: String;
  public validToken: boolean;
  public verifyPassword = '';

  public resetPasswordForm = this.formBuilder.group({
    token: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private toastr: CustomToastrService, private router: Router) { }

  ngOnInit(): void {

    this.passwordResetToken = this.route.snapshot.paramMap.get('passwordResetToken');

    this.authService.resetPasswordVerifyToken(this.passwordResetToken)
      .pipe(catchError(err => {
        this.router.navigateByUrl('/login');
        return throwError(err);
      }))
      .subscribe(
        res => {
          this.validToken = true;
          this.resetPasswordForm.controls.token.patchValue(this.passwordResetToken);
        }
      );
  }

  isValidForm() {
    return this.resetPasswordForm.valid && this.resetPasswordForm.value.password === this.verifyPassword;
  }

  resetPassword() {
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
      res => {
        this.toastr.showSuccess("Password reset successful! Please login to continue");
        this.router.navigateByUrl('/login');
      }
    );
  }

}
