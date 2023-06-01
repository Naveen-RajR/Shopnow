import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    UserprofileComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule
  ]
})
export class UserprofileModule { }
