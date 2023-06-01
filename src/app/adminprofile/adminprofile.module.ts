import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminprofileRoutingModule } from './adminprofile-routing.module';
import { AdminprofileComponent } from './adminprofile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminprofileComponent
  ],
  imports: [
    CommonModule,
    AdminprofileRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminprofileModule { }
