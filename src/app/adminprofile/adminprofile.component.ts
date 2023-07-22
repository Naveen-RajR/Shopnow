import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css'],
})

export class AdminprofileComponent implements OnInit {
  
  productForm: FormGroup;
  errorMessage!: '';
  errorMessageStatus!: boolean;
  products = [];
  
  productCount:number;
  showTable: boolean = false;
  showCard: boolean = true;

  editProductStatus: boolean = false;
  editProductIndex: number;
  id: any;
  selectedFile:File;

  editTable: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    public adminService: AdminService
  ) {}
  
  
  ngOnInit(): any {
    this.viewProducts();
    
    //for creating
    this.productForm = this.fb.group({
      productId: '',
      productName: '',
      description: '',
      productPrice: '',
      productRating: '',
      productImage:''
    });

    //for editing
    this.editTable = this.fb.group({
      productId: '',
      productName: '',
      description: '',
      productPrice: '',
      productRating: '',
    });

  }


  //to toggle cart view
  showGrid() {
    if (this.showCard == false) {
      this.showCard = !this.showCard;
      this.showTable = !this.showTable;
    } else {
      this.showCard = this.showCard;
    }
  }
  //to toggle table view
  showList() {
    if (this.showTable == false) {
      this.showTable = !this.showTable;
      this.showCard = !this.showCard;
    } else {
      this.showTable = this.showTable;
    }
  }

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];

  }

  //adding product
  onProductFormSubmit() {
    // console.log(this.productForm.value);
    const productObject = this.productForm.value;
    const formData=new FormData()
    formData.append('productObject',JSON.stringify(productObject))
    formData.append('productImage',this.selectedFile)
    this.userService.createProduct(formData).subscribe({
      next: (res) => {
        if (res.message == 'Product added') {
          this.errorMessageStatus = false;
          // alert("product added")
          console.log(res)
          this.viewProducts();
          this.productForm.reset();
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

  //to view total products
  viewProducts() {
    this.userService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.productCount = res.count;
        // console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //edit operation
  editProduct(index:any, product:any) {
    this.editProductStatus = true;
    this.editProductIndex = index;
    this.id = product._id;
    this.editTable.setValue({
      productId: product.productId,
      productName: product.productName,
      description: product.description,
      productPrice: product.productPrice,
      productRating: product.productRating,
    });
  }

  //save after editing
  saveProduct() {
    this.editProductStatus = false;
    this.editProductIndex = undefined;
    let modifiedObject = this.editTable.value;
    // console.log("updated Object",modifiedObject,modifiedObject._id)
    modifiedObject.id = this.id;
    
    // console.log(this.id, "from frontend")

    this.userService.editProduct(modifiedObject).subscribe({
      next: (res) => {
        console.log(res);
        this.viewProducts();
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //delete product
  deleteProduct(id: any) {
    console.log(id);
    this.userService.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.viewProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
