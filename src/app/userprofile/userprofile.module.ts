import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserprofileComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    ReactiveFormsModule,
    FormsModule
   
  ]
})
export class UserprofileModule { }
