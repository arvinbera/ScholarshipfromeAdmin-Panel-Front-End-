import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { AuthGuard as Guard} from '../jwt/AuthGuard';
const routes: Routes = [
   {
    path:"application",
    component:ApplicationComponent,canActivate:[Guard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageModuleRoutingModule { }
