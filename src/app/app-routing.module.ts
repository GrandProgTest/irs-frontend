import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {VendorManagementComponent} from "./vendors/pages/vendor-management/vendor-management.component";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {authenticationGuard} from "./iam/services/authentication.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vendors', component: VendorManagementComponent , canActivate: [authenticationGuard] },
  { path: '', redirectTo: 'vendors', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
