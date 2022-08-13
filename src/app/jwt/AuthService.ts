import {Injectable} from '@angular/core';

import {JwtHelperService} from '@auth0/angular-jwt';
import SessionHelper from '../core/SessionHelper';


@Injectable({providedIn: 'root'})
export class AuthService {

  public jwtHelper = new JwtHelperService();
  public IsAuthenticated(): boolean {
   
    if (SessionHelper.GetSession()) {
      return true;
    }

  return false;
  }
}
