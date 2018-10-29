import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ProductListService } from '../../services/product-list.service';
import { Category } from '../../interfaces/category';
import { Subcategory } from '../../interfaces/subcategory';
import { Product } from '../../interfaces/product';
import { FilterSortProducts } from '../../interfaces/filter-sort-products';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Article } from 'src/app/interfaces/article';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, AfterViewInit {


  @ViewChild('accordion') accordion:NgbAccordion;
  categories:Array<Category>;
  selectedSubcategory: Subcategory;
  selectedCategory:Category;
  displayedItems:Array<Product>;
  filterSortProducts=new FilterSortProducts(false,false);
  displayedCount:number;
  categoryCount:number;
  toggleStockOnlyContent:string;
  toggledStockOnly:boolean;
  


  constructor(private productListService:ProductListService, private cartService:ShoppingCartService) { 

  }

  ngOnInit() {
    this.productListService.getAll().subscribe((response)=>{
      this.categories=response;
      this.toggleStockOnlyContent="In Stock Only";
      this.selectSubcategory(this.categories[0].subcategories[0]);
      
      setTimeout(()=>this.accordion.expand('toggle-0'),0);
      
    })
    }

    ngAfterViewInit(): void {
    }



  toggleStockOnly(){
    this.toggledStockOnly=!this.toggledStockOnly;
    this.toggleStockOnlyContent=this.toggledStockOnly?"Show All":"In Stock Only";
    this.displayProducts()
  }

  sortBy(sortParam:string){
    switch(sortParam){
      case 'None':this.displayProducts();
      break;
      case 'Price':this.displayedItems=this.displayedItems.sort((a,b)=>a.price>b.price?1:-1);
      break;
      case 'Alphabetical':this.displayedItems=this.displayedItems.sort((a,b)=>a.name>b.name?1:-1);
      break;
      case 'Rating':this.displayedItems=this.displayedItems.sort((a,b)=>a.rating>b.rating?1:-1);
      break;
    }
  }

  displayProducts(){
    this.displayedItems=this.toggledStockOnly?this.selectedSubcategory.items.filter(i=>i.stock!=="0"):this.selectedSubcategory.items;
    this.displayedCount=this.displayedItems.length;
    this.categoryCount=this.selectedCategory.subcategories.reduce((acc,s):number=>acc+=s.items.length,0);
  }


  selectSubcategory(subcategory:Subcategory){
    this.selectedCategory=this.categories.find(c=>c.subcategories.includes(subcategory))
    this.selectedSubcategory=subcategory;
    this.displayProducts()

  }

  sortFilter(){
    this.displayedItems=this.selectedSubcategory.items
    .filter(p=> (!this.filterSortProducts.maxPrice||p.price< this.filterSortProducts.maxPrice)&&(!this.filterSortProducts.stockedOnly||p.stock!=="0"));
    if(this.filterSortProducts.sortByPrice)
    this.displayedItems.sort((p1,p2)=>p1.price-p2.price);
  }

  addToCart(product:Product){
    this.cartService.addToShoppingCart({'product':product, 'quantity':1} as Article);
    this.productListService.removeFromCashedStock(product.name, 1);
  }
}
