import { Component, OnInit } from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import { ProductListService } from '../../services/product-list.service';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private items:Array<Product>
  constructor(private productsSearch: ProductListService) { }

  ngOnInit() {
    this.items=new Array<Product>();
    this.productsSearch.getAll().subscribe((response)=>{

      response.forEach(r=>r.subcategories.forEach(s=>this.items=this.items.concat(s.items.filter(i=>i.isFeatured))))
      console.log(this.items)
    })
  }

}
