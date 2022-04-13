import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProjectManagementComponent } from './project/project-management/project-management.component';

const routes: Routes = [
  {path:'header',component:HeaderComponent,},
  {path:'project',component:ProjectManagementComponent},
  {path:'home',component:HomeComponent},
  {path:'', redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
