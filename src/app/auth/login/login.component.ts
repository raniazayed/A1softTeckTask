import { Component, OnInit } from '@angular/core';
import { ErrService } from 'src/app/shared/components/err/err.service';
import { Validators, FormBuilder } from '@angular/forms';
import { regex } from 'src/config/regex';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/config/request-status';
import { enLanguage } from 'src/language/en';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loading: boolean;
  __ = enLanguage.en;
  constructor(public errService: ErrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(regex.regexPattern.email)]],
      password: ['', [Validators.required, Validators.pattern(regex.regexPattern.password)]],
    });
    this.checkAuthentication();
  }
  checkAuthentication(){
    if(this.userService.hasCookies()){
      this.router.navigate(["/dashboard/home"])
    }
  }
  get form() { return this.loginForm.controls; }
  login() {
    this.errService.changeMessage("");
    if (this.loading || this.loginForm.invalid) {
      for (let control in this.loginForm.controls) {
        this.loginForm.controls[control].touched = true;
      }
      return;
    }
    this.loading = true;
    this.userService.login(this.loginForm.value).subscribe(res => {
      this.userService.saveUserCookies(res.token);
      this.loading = false;
      if (this.userService.hasCookies()) {
        this.router.navigate(["/dashboard/home"])
      }
    }, err => {
      this.errService.changeMessage(err.error.error)
      this.loading = false;
    })
  }
}
