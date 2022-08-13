import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BaseDataService from './BaseDataService';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends BaseDataService{

  constructor(private http:HttpClient) { 
    super();
  }

  AddSkill(model:any)
  {
    return this.PostRequest(this.http,"/skill/create",model);
  }

  ListSkill()
  {
    return this.GetRequest(this.http,"/skill/list");
  }

  UpdateSkill(model:any)
  {
    return this.PutRequest(this.http,"/skill/update",model);
  }
}
