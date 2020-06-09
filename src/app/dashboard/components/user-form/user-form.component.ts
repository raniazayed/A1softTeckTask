import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { regex } from 'src/config/regex';
import { UsersListService } from '../../services/users-list.service';
import { enLanguage } from 'src/language/en';
import { ErrService } from 'src/app/shared/components/err/err.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  edit: boolean;
  id: any;
  userForm:any;
  loading: any;
  __ = enLanguage.en;
  constructor(private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private userListService:UsersListService,
    private router:Router,
    private errService:ErrService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(regex.regexPattern.name)]],
      job: ['', [Validators.required, Validators.pattern(regex.regexPattern.password)]],
    });
    this.checkRoute();
  }
  get form(){return this.userForm.controls}
  checkRoute(){
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if(this.id){
        this.edit = true;
      }
    });
  }
  addUser(){
    if (this.loading || this.userForm.invalid) {
      for (let control in this.userForm.controls) {
        this.userForm.controls[control].touched = true;
      }
      return;
    }
    this.loading = true;
    if(this.edit){
      // ADD User
      this.userListService.editUser(this.userForm.value).subscribe(res=>{
        this.router.navigate(["/dashboard/home"])
      }, err => {
        this.errService.changeMessage(err.error.error)
        this.loading = false;
      })
    }else{
      // Edit User
      this.userListService.addUser(this.userForm.value).subscribe(res=>{
        this.router.navigate(["/dashboard/home"])
      }, err => {
        this.errService.changeMessage(err.error.error)
        this.loading = false;
      })
    }
  }
}
