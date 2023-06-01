import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  allproducts = [];
  currentUser:any;
  cartCount: number;
  userProduct: any;
  cartProducts;

  constructor(
    public userService: UserService,
    public adminService: AdminService,
    public cartService: CartService,
    public router:Router,
    public toastr:ToastrService
  ) {}
  
  ngOnInit(): any {
    this.getProducts();
    this.currentUser = this.adminService.currentUser;

    this.cartService.getCartProduct(this.currentUser.firstName).subscribe({
      next:(res)=>{
        this.userProduct = res['data'];
        this.cartProducts = this.userProduct?.products;
        
        // console.log("cart products",this.cartProducts)
        this.cartService.updateCartCountObservable(this.cartProducts?.length||this.cartService.cartCountSubject.value)
        this.cartService.cartCountObservable$.subscribe(product=>{this.cartCount=product})
      },
      error:(err)=>{
        console.log(err)
        // alert("error in reading")
      }
    })
  }
  
  //to get list of total products
  getProducts() {
    this.userService.getProducts().subscribe({
      next: (res) => {
        this.allproducts = res.data;
        // console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  
  
  //adding product to cart
  // addToCart(firstName:any, cartProduct: any) {
  // let cartObject = {
  //     firstName: firstName,
  //     products: [cartProduct],
  //   };
  //   // console.log('this is frontEnd ', cartObject);
  //   this.cartService.addCart(cartObject).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       alert("added to cart")

  //       this.cartService.updateCartCountObservable(this.cartService.getCurrentCartCount()+1);
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err.message);
  //     },
  //   });

  // }

  addingToCart(firstName:any,cartProduct:any){

    let cartObject={
      firstName:firstName,
      products:[cartProduct]
    }

    // console.log("this is cartObject", cartObject)

    this.cartService.addCart(cartObject).subscribe({
      next:(res)=>{
        this.toastr.info("added to cart", "",{
          timeOut:3000,
          progressBar:true,
          progressAnimation:"decreasing",
          positionClass:"toast-top-center",
          easing:"ease-out",
          easeTime:1000
        })
        this.cartService.updateCartCountObservable(this.cartService.getCurrentCartCount()+1);


        // console.log("this is",res)
        // alert("added to cart");

      },
      error:(err)=>{err}
    })

  }

  // viewCart(firstName){
  //   this.router.navigateByUrl(`/userProfile/cart/${firstName}`)
  // }

  
}
