import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class DistrictService extends BaseDataService{

  constructor(private http:HttpClient) { 
    super();
  }

  AddDistrict(model:any){
    return this.PostRequest(this.http,"/district/create",model);
  }

  ListDistrict(){
    return this.GetRequest(this.http,"/district/list");
  }

  UpdateDistrict(model:any){
    return this.PutRequest(this.http,"/district/update",model);
  }
}
