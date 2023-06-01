import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userProduct:any;
  cartProducts: any;
  currentUser:any;
  cartItemsCount: any;

  constructor(
    public cartService: CartService,
    public adminService: AdminService
  ) {}

  



  ngOnInit(): any {
    this.currentUser = this.adminService.currentUser;
    this.viewCartProducts(this.currentUser.firstName);
    // console.log(this.currentUser.firstName);
  }

  //to see cart products
  viewCartProducts(firstName) {
    // console.log('this is front end', firstName);
    this.cartService.getCartProduct(firstName).subscribe({
      next: (res) => {
        this.userProduct = res.data;
        this.cartProducts = this.userProduct?.products;
        this.cartItemsCount = res.count;

        // console.log('cart count', this.cartItemsCount);

        // console.log('this is cartProducts', this.cartProducts);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
}
