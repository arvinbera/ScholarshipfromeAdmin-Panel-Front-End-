import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseDataService{

  constructor(private http:HttpClient) { 
    super();
  }

  Login(model:any){
    return this.PostRequest(this.http,"/login",model);
  }
}
