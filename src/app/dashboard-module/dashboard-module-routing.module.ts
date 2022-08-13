import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard as Guard} from '../jwt/AuthGuard';

const routes: Routes = [
  {
    path:"dashboard",
    component:DashboardComponent,canActivate:[Guard]
  },
  {
    path:"users",
    component:UsersComponent,canActivate:[Guard]
  },
  {
    path:"search",
    component:SearchComponent,canActivate:[Guard]
  },
  {
    path:"subscribe",
    component:SubscribeComponent,canActivate:[Guard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
