import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageModuleRoutingModule } from './manage-module-routing.module';
import { ApplicationComponent } from './application/application.component';
import { FollowingComponent } from './following/following.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    FollowingComponent
  ],
  imports: [
    CommonModule,
    ManageModuleRoutingModule
  ]
})
export class ManageModuleModule { }
