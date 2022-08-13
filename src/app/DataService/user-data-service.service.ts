import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService extends BaseDataService{
     
  constructor(private http:HttpClient)
    {
        super();
    }
    
    ListUser(){
      return this.GetRequest(this.http,"/user/list");
    }
    
    Logout(model:any){
      return this.PostRequest(this.http,"/user/logout",model);
    }

    AddUser(model:any){
      return this.PostRequest(this.http,"/user/create",model);
    }

    GetToken() :string
    {
      var stringData= localStorage.getItem('session');

      if(!stringData || stringData==null){
        return (null as unknown) as string;
      }
      
        return JSON.parse(stringData)?.token;

    }
}
