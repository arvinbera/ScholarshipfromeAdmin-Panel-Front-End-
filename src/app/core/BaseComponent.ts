import { Component, Directive, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../DataService/login.service";
import { UserDataServiceService } from "../DataService/user-data-service.service";
import SessionHelper from "./SessionHelper";
@Directive()
export default class BaseComponent implements OnInit {
    public auth: any = false;

    constructor(protected router: Router, private userservice: UserDataServiceService,private loginservice: LoginService) {

    }
    ngOnInit(): void {
        this.auth = SessionHelper.GetSession();
        console.log(this.auth);
    }

    LogOut(): void {
        this.userservice.Logout(this.auth).subscribe(res => {
            console.log(res);
            if (res.is_success) {
                SessionHelper.SetSession(null);
                this.router.navigate(['/login']);
                this.auth = null;
            }
        }, error => { })

    }

}