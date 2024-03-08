import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'body-parser';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl:'./userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  allproducts = [];
  currentUser: any;
  cartCount: number;
  userProduct: any;
  cartProducts: any;
  editUserDetailsForm: FormGroup;
  filteredProducts = [];
  sortedProducts: any = [];
  searchResult: '';
  isAscending: boolean = true;
  userFavourites: any = [];
  favouritesId: any;

  constructor(
    public userService: UserService,
    public adminService: AdminService,
    public cartService: CartService,
    public router: Router,
    public toastr: ToastrService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): any {
    this.getProducts();
    this.currentUser = this.adminService.currentUser;
    const firstName = this.adminService.currentUser.firstName;
    const _id = this.adminService.currentUser._id;

    this.viewFavourites(_id);

    //to get cart products
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
        this.filteredProducts = res.data;
        this.allproducts = res.data;
        // this.userFavourites=this.filteredProducts;
        this.sortedProducts = this.allproducts;
        // console.log(this.allproducts, 'all products');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //add to cart
  addingToCart(firstName: any, cartProduct: any) {
    let cartObject = {
      firstName: firstName,
      products: [cartProduct],
    };
    // console.log(cartObject, 'from frontend');
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

  // to save edited
  saveChanges() {
    const formValues = this.editUserDetailsForm.value;
    // console.log(formValues);
    this.adminService.updateUser(formValues).subscribe({
      next: (res) => {
        // console.log(res)
        this.toastr.success('', 'Profile Updated 🪄', {
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
  filterSearch() {
    this.filteredProducts = this.allproducts.filter((text) =>
      text.productName.toLowerCase().includes(this.searchResult)
    );
  }

  //for sorting
  onSortChanged() {
    this.isAscending = !this.isAscending;
    this.filteredProducts.sort((a, b) => {
      // console.log(this.sortedProducts,"cloned array")
      const priceA = a.productPrice;
      const priceB = b.productPrice;
      // console.table(priceA, priceB);
      return this.isAscending ? priceA - priceB : priceB - priceA;
    });
  }

  // adding to favouritee
  onToFavourite(id: any, product: any) {
    let favObject = {
      _userid: id,
      products: [product],
    };
    // console.log(favObject, 'favobject');

    this.cartService.toFav(favObject).subscribe({
      next: (res) => {
        // console.log(res);
        this.viewFavourites(this.currentUser._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // viewFavourites
  viewFavourites(_id: any) {
    // console.log(_id, "view favourites")
    this.cartService.getFavProduct(_id).subscribe({
      next: (res) => {
        // console.log(res.data ,"data response")
        // console.log(res.data[0]?.products, '0th index');
        this.userFavourites = res.data[0]?.products;
        this.isFavourite();
      },
    });
  }

  isFavourite() {
    this.favouritesId = this.userFavourites?.map(
      (product) => product.productId
    );
    // console.log(this.favouritesId, 'jikj');
  }
}
