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
    this.route.paramMap.subscribe((params: ParamMap) => {
    this.productListService.get(params.get('name')).subscribe((response)=>{
      this.loading=false;
      this.article={product:response, quantity:0}
    
  
    });
    
    })
  }

  addToCart(){
    if(this.article.quantity)this.cartService.addToShoppingCart(this.article);
    this.productListService.removeFromCashedStock(this.article.product.name, this.article.quantity);
    this.router.navigate(['/shopping']);
  }

}
