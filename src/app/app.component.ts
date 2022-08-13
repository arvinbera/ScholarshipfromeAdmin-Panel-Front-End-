import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import BaseComponent from './core/BaseComponent';
import SessionHelper from './core/SessionHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'scholarship';
  page:any;
 // isLogin:number=0;
 OnclickActive(x:any):void
 {
   if(x==1)
   {
    this.page=1;
   }
   else if(x==2)
   {
    this.page=2;
   }
   else if(x==3)
   {
    this.page=3;
   }
   else if(x==4)
   {
    this.page=4;
   }
   else if(x==5)
   {
    this.page=5;
   }
   else if(x==6)
   {
    this.page=6;
   }
   else if(x==7)
   {
    this.page=7;
   }
   else if(x==8)
   {
    this.page=8;
   }
   else if(x==9)
   {
    this.page=9;
   }
   else if(x==10)
   {
    this.page=10;
   }
   else if(x==11)
   {
    this.page=11;
   }
   else
   {
    this.page=12;
   }

 }
}
