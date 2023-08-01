import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { User1WorkComponent } from './user1-work/user1-work.component';
import { User2WorkComponent } from './user2-work/user2-work.component';
import { ErrorComponent } from './error/error.component';
import { LinksGuard } from './services/links.guard';
import { User1GardGuard } from './services/user1-gard.guard';
import { User2GardGuard } from './services/user2-gard.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"user1",component:User1WorkComponent,canActivate:[User1GardGuard]},
  {path:"user2",component:User2WorkComponent,canActivate:[User2GardGuard]},
  {path:"admin",loadChildren: ()=> import ("./admin/admin/admin.module").then( m=> m.AdminModule),canActivate:[LinksGuard]},

  {path:"**",component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
