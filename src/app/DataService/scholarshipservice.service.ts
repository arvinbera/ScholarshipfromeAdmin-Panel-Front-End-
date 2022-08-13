import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipserviceService extends BaseDataService {

  constructor(private http:HttpClient) { 
    super();
  }

  AddScholarship(model:any)
  {
    return this.PostRequest(this.http,"/scholarship/create",model)
  }

  ListScholarship()
  {
    return this.GetRequest(this.http,"/scholarship/list");
  }

  UpdateScholarship(model:any)
  { 
    return this.PutRequest(this.http,"/scholarship/update",model);
  }
}
