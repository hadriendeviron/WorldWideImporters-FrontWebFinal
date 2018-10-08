import { Component, OnInit } from '@angular/core';

import { Product } from '../../interfaces/product';
import { ProductListService } from '../../services/product-list.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private items:Array<Product>
  loading: boolean;
  constructor(private productsSearch: ProductListService) { }

  ngOnInit() {
    this.loading=true;
    this.items=new Array<Product>();
    this.productsSearch.getAll().subscribe((response)=>{
      this.loading=false;
      console.log("stopped loadeing")
      response.forEach(r=>r.subcategories.forEach(s=>this.items=this.items.concat(s.items.filter(i=>i.isFeatured))))
    })
  }

}
