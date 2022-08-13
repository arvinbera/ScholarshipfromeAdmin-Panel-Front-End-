import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScholarshipModuleRoutingModule } from './scholarship-module-routing.module';
import { ScholarshipComponent } from './scholarship/scholarship.component';
import { AddscholarshipComponent } from './addscholarship/addscholarship.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    ScholarshipComponent,
    AddscholarshipComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    ScholarshipModuleRoutingModule,
    NgxSummernoteModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ScholarshipModuleModule { }
