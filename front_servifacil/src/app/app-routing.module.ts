import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  { path: '', redirectTo:'/dashboard',pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
