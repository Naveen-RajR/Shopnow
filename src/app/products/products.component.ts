import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  
  albums:any=[]

  isTableView=true;
  isCardView=false;
  
  constructor(public adminService:AdminService){}
  

  ngOnInit(): void {
    this.adminService.getProducts().subscribe({
      next:(response)=>{
        this.albums=response;
        console.log(response)

      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  toggleView(){
    this.isTableView=!this.isTableView;
    this.isCardView=!this.isCardView;
  }
}
