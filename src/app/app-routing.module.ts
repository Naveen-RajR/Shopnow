import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

import { CartComponent } from './userprofile/cart/cart.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'products',component:ProductsComponent},
  {path:'signup', component:RegisterComponent},
  {path:'userprofile/cart/:firstName',component:CartComponent},
  { path: 'userprofile/:firstName', loadChildren: () => import('./userprofile/userprofile.module').then(m => m.UserprofileModule) },
  { path: 'adminprofile/:admin', loadChildren: () => import('./adminprofile/adminprofile.module').then(m => m.AdminprofileModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
