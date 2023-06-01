import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  constructor(public adminService:AdminService){}
  
  // loginStatus;]
  
  ngOnInit(): void {

    // this.adminService.isLoggedIn.subscribe((status)=>{

      // this.loginStatus=status

    
  }

  // login(){
  //   this.adminService.loginButton();
  // }

  // logout(){
  //   this.adminService.logoutUser()
  // }


}
