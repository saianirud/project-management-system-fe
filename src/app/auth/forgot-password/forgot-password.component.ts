import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public securityQuestions = [];
  public showPasswordScreen = false;
  public verifyPassword = '';
  public linkSent: boolean;

  public forgotPasswordForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required, Validators.email]),
    securityQuestionId: this.formBuilder.control('', Validators.required),
    securityAnswer: this.formBuilder.control('', Validators.required)
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    if (this.authService.securityQuestions.length === 0) {
      this.authService.getSecurityQuestions().subscribe(
        (res: any) => {
          this.authService.securityQuestions = res;
          this.securityQuestions = res;
        }
      );
    } else {
      this.securityQuestions = this.authService.securityQuestions;
    }
  }

  sendForgotPasswordToken() {

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      res => {
        this.linkSent = true;
      }
    );
  }

}
