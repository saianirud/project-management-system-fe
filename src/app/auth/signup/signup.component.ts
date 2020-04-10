import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public securityQuestions;
  public showPasswordScreen = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.getSecurityQuestions().subscribe(
      res => {
        this.securityQuestions = res;
      }
    );
  }

}
