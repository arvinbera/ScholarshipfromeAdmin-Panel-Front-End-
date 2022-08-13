import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModuleModule } from './dashboard-module/dashboard-module.module';
import { ManageModuleModule } from './manage-module/manage-module.module';
import { ScholarshipModuleModule } from './scholarship-module/scholarship-module.module';
import { SetupModuleModule } from './setup-module/setup-module.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { NgSelect2Module } from 'ng-select2';
import { CommonModule } from '@angular/common';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    DashboardModuleModule,
    SetupModuleModule,
    ScholarshipModuleModule,
    ManageModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelect2Module,
    CommonModule,
    NgxSummernoteModule,
    FormsModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
