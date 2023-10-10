import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(public hp: HttpClient, public adminService: AdminService) {}

  cartCountSubject = new BehaviorSubject<any>(0);

  public cartCountObservable$ = this.cartCountSubject.asObservable();

  updateCartCountObservable(lastestCount: any) {
    this.cartCountSubject.next(lastestCount);
  }

  getCurrentCartCount() {
    return this.cartCountSubject.getValue();
  }

  //get and post
  addCart(cartObject: any): Observable<any> {
    // console.log("service ",cartObject)
    return this.hp.post('/cart/createCart', cartObject);
  }

  toFav(favObject: any): Observable<any> {
    // console.log("service ",cartObject)
    return this.hp.post('/favourite/createFav', favObject);
  }

  getCartProduct(firstName: any): Observable<any> {
    return this.hp.get(`/cart/${firstName}`);
  }
  getFavProduct(id: any): Observable<any> {
    // console.log(id, 'from service');
    return this.hp.get(`/favourite/${id}`);
  }
}
