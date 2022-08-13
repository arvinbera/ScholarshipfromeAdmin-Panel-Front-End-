import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import BaseComponent from '../core/BaseComponent';
import SessionHelper from '../core/SessionHelper';
import { LoginService } from '../DataService/login.service';
import { UserDataServiceService } from '../DataService/user-data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
  form!: FormGroup;
  submitted = false;
  constructor(private http: LoginService, private formBuilder: FormBuilder, router: Router,private useservice:UserDataServiceService) {
    super(router,useservice,http);
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });
  
    
    if(this.auth!=null)
    { 
      this.router.navigate(['/dashboard']);
    }
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  Login(): void {
    this.submitted = true;
    console.log(this.form.value);
    this.http.Login(this.form.value).subscribe(res => {
      if (res.is_success) {
        SessionHelper.SetSession(res.data);
        this.auth = res.data;
        //this.router.navigate(['/dashboard']);  TO DO
        window.location.href="/dashboard";
      }
      else{
        alert("Wrong Credential");
      }
    }, error => {
      alert(error)
    });

  }
}
