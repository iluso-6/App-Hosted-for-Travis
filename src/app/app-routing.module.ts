import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // case-details
  { path: 'home', loadChildren: './main/main.module#MainPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
 // { path: 'case-details', loadChildren: './case-details/case-details.module#CaseDetailsPageModule' },
  { path: 'case-details/:case_num', loadChildren: './case-details/case-details.module#CaseDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
