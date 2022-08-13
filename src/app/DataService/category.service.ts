import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseDataService{

  constructor(private http:HttpClient) { 
    super();
  }
  
  AddCategory(model:any){
    return this.PostRequest(this.http,"/category/create",model);
  }

  ListCategory(){
    return this.GetRequest(this.http,"/category/list");
  }

  PutCategory(model:any){
    return this.PutRequest(this.http,"/category/update",model);
  }
}
