import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public hp:HttpClient) { }


  createProduct(productObject:any):Observable<any>{
    return this.hp.post('/admin/createProduct',productObject)
  }

  getProducts():Observable<any>{
    return this.hp.get<any[]>('/admin/getProducts')
  } 

  editProduct(modifiedObject:any):Observable<any>{
    console.log(modifiedObject)
    return this.hp.put(`/admin/${modifiedObject.id}`,modifiedObject)
  }

  deleteProduct(id:any):Observable<any>{
    return this.hp.delete(`/admin/${id}`)
  }
}
