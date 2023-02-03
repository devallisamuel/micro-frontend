import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMgtComponent } from './usermgt.component';
import { RoleComponent } from './role/role.component';
import { CanDeactivateGuard, AuthGuard } from '../../..';
import { UserComponent } from './user/user.component';
import { UserMgtResolver } from './usermgt.resolver';
const userRoutes: Routes = [
  {
    path: 'usermanagement', component: UserMgtComponent,
    canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard],
    // resolve: {
    //   usermgt: UserMgtResolver
    // },
    children: [
      {
        path: 'role', component: RoleComponent,
        canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard], canLoad: [AuthGuard],
      },
      {
        path: 'user', component: UserComponent,
        canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard], canLoad: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
  providers: [UserMgtResolver]
})
export class UserMgtRoutingModule { }


