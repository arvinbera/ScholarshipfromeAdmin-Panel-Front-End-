import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowingComponent } from '../manage-module/following/following.component';
import { ScholarshipComponent } from './scholarship/scholarship.component';
import { AuthGuard as Guard} from '../jwt/AuthGuard';
import { AddscholarshipComponent } from './addscholarship/addscholarship.component';
const routes: Routes = [
  {
    path:"scholarship",
    component:ScholarshipComponent,canActivate:[Guard]
  },
  {
    path:"following",
    component:FollowingComponent,canActivate:[Guard]
  },
  {
    path:"addscholarship",
    component:AddscholarshipComponent,canActivate:[Guard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScholarshipModuleRoutingModule { }
