import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {





  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  private _loginService: LoginService;

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  ngOnInit() {
  }

  public login() {
    console.log(this.loginForm.value);

    this._loginService.loginUser(JSON.stringify({
      ...this.loginForm.value
    })).subscribe((user: any) => {
      if (user) {
        console.log(user);
      }
    }, (error) => console.log(error));
  }
}
