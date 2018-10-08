import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { ProductListService } from '../../services/product-list.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  


  constructor(private productListService:ProductListService,private route: ActivatedRoute, private router: Router, private cartService:ShoppingCartService) { }

  article:Article
  loading: boolean

  ngOnInit() {
    this.loading=true;
    console.log("start loading")
    this.route.paramMap.subscribe((params: ParamMap) => {
    this.productListService.get(params.get('name')).subscribe((response)=>{
      console.log("stop loading")
      this.loading=false;
      this.article={product:response, quantity:0}
    
  
    });
    
    })
  }

  addToCart(){
    if(this.article.quantity)this.cartService.addToShoppingCart(this.article)
  }

}
