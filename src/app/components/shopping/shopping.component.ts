import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ProductListService } from '../../services/product-list.service';
import { Category } from '../../interfaces/category';
import { Subcategory } from '../../interfaces/subcategory';
import { Product } from '../../interfaces/product';
import { FilterSortProducts } from '../../interfaces/filter-sort-products';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  categories:Array<Category>;
  selectedSubcategory: Subcategory;
  displayedItems:Array<Product>;
  filterSortProducts=new FilterSortProducts(false,false);


  constructor(private productListService:ProductListService) { 

  }

  ngOnInit() {
    this.productListService.getAll().subscribe((response)=>{
      this.categories=response;
    })
    }


  selectSubcategory(subcategory:Subcategory){
    this.selectedSubcategory=subcategory
    this.displayedItems=subcategory.items
  }

  sortFilter(){
    this.displayedItems=this.selectedSubcategory.items
    .filter(p=> (!this.filterSortProducts.maxPrice||p.price< this.filterSortProducts.maxPrice)&&(!this.filterSortProducts.stockedOnly||p.stock!=="0"));
    if(this.filterSortProducts.sortByPrice)
    this.displayedItems.sort((p1,p2)=>p1.price-p2.price);
  }
}
