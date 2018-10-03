import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['shoppingCart'])
    {
      this.subtotal=this.shoppingCart.map(a=>a.quantity*a.product.price).reduce((p1,p2)=>p1+p2);
      this.Tax=this.subtotal*0.1;
      this.Total=this.subtotal+this.shipping+this.Tax;
    }
  }
  shoppingCart: Article[];
  subtotal:number;
  shipping:number=10;
  Tax:number;
  Total:Number;

  constructor(shoppingCartService:ShoppingCartService) { 
    this.shoppingCart=shoppingCartService.shoppingCart;
  }

  ngOnInit() {
    
  }


}
