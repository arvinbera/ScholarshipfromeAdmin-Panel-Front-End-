import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseDataService{

  constructor(private http:HttpClient) { super();}
  
  AddQualification(model:any){
    return this.PostRequest(this.http,"/qualification/create",model);
  }

  ListQualification(){
    return this.GetRequest(this.http,"/qualification/list");
  }

  UpdateQualification(model:any){
    return this.PutRequest(this.http,"/qualification/update",model);
  }
}
