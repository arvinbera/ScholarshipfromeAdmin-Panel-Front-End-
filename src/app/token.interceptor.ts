import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataServiceService } from './DataService/user-data-service.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  token!: string;
  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.injector.get(UserDataServiceService);
    this.token=authservice.GetToken();
    //console.log(this.token)
    if(!this.token)
    {
      return next.handle(request);
    }
    
      let tokenizedReq = request.clone({
        setHeaders:{
          Authorization: `Bearer ${authservice.GetToken()}`
        }
      })
      return next.handle(tokenizedReq);
    
    
  }
}
