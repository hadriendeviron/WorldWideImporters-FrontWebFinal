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

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    this.productListService.get(params.get('name')).subscribe((response)=>{
      console.log("here i am"+response);
      this.article={product:response, quantity:0}
    });
    
    })
  }

  addToCart(){
    this.cartService.addToShoppingCart(this.article)
  }

}
