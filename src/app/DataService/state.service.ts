import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseDataService{

  constructor(private http:HttpClient) {
    super();
   }
  
   AddState(model:any)
   {
    return this.PostRequest(this.http,"/state/create",model);
   }

   ListState(model:any)
   {
    return this.GetRequest(this.http,"/state/list?page="+model);
   }

   UpdateState(model:any)
   {
    return this.PutRequest(this.http,"/state/update",model);
   }
}
