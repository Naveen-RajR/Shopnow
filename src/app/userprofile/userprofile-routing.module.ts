import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserprofileComponent } from './userprofile.component';

const routes: Routes = [{ path: '', component: UserprofileComponent },
                        {path:'cart',component:CartComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserprofileRoutingModule { }
