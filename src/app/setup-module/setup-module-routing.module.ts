import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DistrictComponent } from './district/district.component';
import { QualificationComponent } from './qualification/qualification.component';
import { SkillComponent } from './skill/skill.component';
import { StateComponent } from './state/state.component';
import { AuthGuard as Guard} from '../jwt/AuthGuard';
const routes: Routes = [
  {
    path:"category",
    component:CategoryComponent,canActivate:[Guard]
  },
  {
    path:"qualification",
    component:QualificationComponent,canActivate:[Guard]
  },
  {
    path:"skill",
    component:SkillComponent,canActivate:[Guard]
  },
  {
    path:"state/:id",
    component:StateComponent,canActivate:[Guard]
  },
  {
    path:"state",
    component:StateComponent,
  },
  {
    path:"district",
    component:DistrictComponent,canActivate:[Guard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupModuleRoutingModule { }
