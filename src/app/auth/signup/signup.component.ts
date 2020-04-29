import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomToastrService } from 'src/app/service/toastr/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public securityQuestions = [];
  public verifyPassword = '';

  public signUpForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    securityQuestion: this.formBuilder.control('', Validators.required),
    securityAnswer: this.formBuilder.control('', Validators.required)
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastr: CustomToastrService, private router: Router) { }

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

  isValidForm() {
    return this.signUpForm.valid && this.signUpForm.value.password === this.verifyPassword;
  }

  registerUser() {
    console.log(this.signUpForm);
    this.authService.registerUser(this.signUpForm.value).subscribe(
      res => {
        this.toastr.showSuccess('Regitration Successful! Please login to continue');
        this.router.navigateByUrl('/login');
      }
    );
  }

}
