import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor( public router:Router, public fb:FormBuilder, public adminService:AdminService){}

  userForm!:FormGroup
  errorMessage!:""
  errorMessageStatus!:boolean;

  
  ngOnInit(): void {
    this.userForm=this.fb.group({
      firstName:'',
      lastName:'',
      // dob:'',
      country:'',
      phoneNumber:'',
      password:'',
      email:''
    })
  }


  

  redirectTo(){
    this.router.navigateByUrl('/login')
  }
  loginRedirect(){
    this.router.navigateByUrl('/login')
  }

  onFormSubmit(){
    console.log(this.userForm.value)

    const userInfo=this.userForm.value;

    this.adminService.createUser(userInfo).subscribe({
      next:(res)=>{

        if(res.message=="registration success"){
          this.errorMessageStatus=false;
          this.router.navigateByUrl('/login')
          // this.errorMessage=res.message
          this.adminService.openSnackBar('User Created','🎊')
        }
        else{
          this.errorMessage=res.message
        }
      },
      error:(err)=>{
        console.log(err)
        
      },
    })





  }

}
