import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupModuleRoutingModule } from './setup-module-routing.module';
import { CategoryComponent } from './category/category.component';
import { QualificationComponent } from './qualification/qualification.component';
import { SkillComponent } from './skill/skill.component';
import { StateComponent } from './state/state.component';
import { DistrictComponent } from './district/district.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [
    CategoryComponent,
    QualificationComponent,
    SkillComponent,
    StateComponent,
    DistrictComponent
  ],
  imports: [
    CommonModule,
    SetupModuleRoutingModule,
    ReactiveFormsModule,
    NgSelect2Module,
    FormsModule,
  ]
})
export class SetupModuleModule { }
