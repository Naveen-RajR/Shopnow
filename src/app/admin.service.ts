import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(public hp: HttpClient) { }
  
  loginStatus=false;
  currentUser;



  getProducts():Observable<any>{
    return this.hp.get('https://fakestoreapi.com/products')

  }

  createUser(userInfo:any):Observable<any>{
    return this.hp.post('/user/register',userInfo)
  }

 
  loginUser(loginData:any):Observable<any>{
    return this.hp.post('/user/login',loginData)
    
  }
  
  adminLogin(adminObj:any):Observable<any>{
    return this.hp.post('/admin/login',(adminObj))
  }

  get adminAuth(){
    return false;
  }

  logout(){
    localStorage.removeItem("token")
    this.loginStatus=false;
  }

  updateUser(payload):Observable<any>{
    console.log("from service",payload)
    return this.hp.put(`/user/${this.currentUser._id}`,payload)
  }
  

  // isLoggedIn=new BehaviorSubject(false);

  // loginButton(){
  //   this.isLoggedIn.next(true)
  // }

  // logoutUser(){
  //   this.isLoggedIn.next(false);
  // }

 



}
