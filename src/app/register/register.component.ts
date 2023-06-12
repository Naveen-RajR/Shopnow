import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor( public router:Router, public fb:FormBuilder, public adminService:AdminService,public toastr:ToastrService){}

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


  

  // redirectTo(){
  //   this.router.navigateByUrl('/login')
  // }
  
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
          this.toastr.success("Login here","User Created🎉",{
            timeOut:5000,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:"toast-top-right"
            
          })
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
