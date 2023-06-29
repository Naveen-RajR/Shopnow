import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  currentUser: any;
  cartCount: number;
  userProduct: any;
  cartProducts: any;
  editUserDetailsForm: FormGroup;
  filteredProducts=[];
  sortedProducts:any=[];
  searchResult:''
  isAscending:boolean=true;
  
  

  constructor(
    public userService: UserService,
    public adminService: AdminService,
    public cartService: CartService,
    public router: Router,
    public toastr: ToastrService,
    public formBuilder: FormBuilder,
  ) {}

  ngOnInit(): any {
    this.getProducts();
    this.currentUser = this.adminService.currentUser;
    const firstName=this.adminService.currentUser.firstName;
    console.log(firstName)
    // console.log("user details",this.currentUser)
    this.cartService.getCartProduct(firstName).subscribe({
      next: (res) => {
        this.userProduct = res['data'];
        this.cartProducts = this.userProduct?.products;
        // console.log("cart products",this.cartProducts)
        this.cartService.updateCartCountObservable(
          this.cartProducts?.length || this.cartService.cartCountSubject.value
        );
        this.cartService.cartCountObservable$.subscribe((product) => {
          this.cartCount = product;
        });
      },
      error: (err) => {
        console.log(err);
        // alert("error in reading")
      },
    });

    //for editing user details
    const userData = this.adminService.currentUser;
    const selectCountry = userData.country;
    this.editUserDetailsForm = this.formBuilder.group({
      firstName: userData.firstName,
      lastName: userData.lastName,
      country: selectCountry,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });

   
  }

  //to get list of total products
  getProducts() {
    this.userService.getProducts().subscribe({
      next: (res) => {
        this.filteredProducts=res.data
        this.allproducts = res.data;
        this.sortedProducts=this.allproducts
        console.log(this.allproducts,'all products');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addingToCart(firstName: any, cartProduct: any) {
    let cartObject = {
      firstName: firstName,
      products: [cartProduct],
    };
    
    console.log("this is cartObject", cartObject)
    this.cartService.addCart(cartObject).subscribe({
      next: (res) => {
        this.toastr.info('added to cart', '', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center',
          easing: 'ease-out',
          easeTime: 1000,
          closeButton: true,
        });
        this.cartService.updateCartCountObservable(
          this.cartService.getCurrentCartCount() + 1
        );
      },
      error: (err) => {
        err;
      },
    });
  }

  saveChanges() {
    const formValues = this.editUserDetailsForm.value;

    console.log(formValues);
    this.adminService.updateUser(formValues).subscribe({
      next: (res) => {
        // console.log(res)
        this.toastr.success('', 'Profile Updated🪄', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true,
        });
      },
      error: (error) => {
        alert('error occured');
        console.log(error);
      },
    });
  }

  //to search
  filterSearch(){
    this.filteredProducts=this.allproducts.filter(
      text=>text.productName.toLowerCase().includes(this.searchResult)
    )
  }

  onSortChanged(){
    this.isAscending=!this.isAscending
    this.filteredProducts.sort((a,b)=>{
      // console.log(this.sortedProducts,"cloned array")
      const priceA=a.productPrice;
      const priceB=b.productPrice;
      console.table(priceA,priceB)
      return this.isAscending?priceA-priceB:priceB-priceA
    })
  }



}
