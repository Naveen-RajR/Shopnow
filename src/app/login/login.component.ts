import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;
  errorMessageStatus!: boolean;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public adminService: AdminService,
    public userService:UserService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      type: '',
    });
  }

  loginSubmit() {
    if (this.loginForm.value.type == 'user') {
      // let loginData = this.loginForm.value;
      this.adminService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success Login') {
            this.errorMessageStatus = false;
            let token = res.token;
            // console.log(token);
            // console.log(res.user)
            this.adminService.currentUser=res.user
            localStorage.setItem('token', token);
            this.router.navigateByUrl(`/userprofile/${res.user.firstName}`);
            this.adminService.loginStatus = true;
          } else {
            this.errorMessageStatus = true;
            this.errorMessage = res.message;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    //if admin
    if(this.loginForm.value.type=="admin"){
      this.adminService.adminLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message=="login Success"){
            this.errorMessageStatus=false;
            let token =res.token;
            // console.log(token);
            localStorage.setItem("token",token);
            this.router.navigateByUrl(`/adminprofile/${res.admin}`);
            this.adminService.loginStatus=true;
          }
          else{
            this.errorMessageStatus=true;
            this.errorMessage=res.message;
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })

    }
  }
}
