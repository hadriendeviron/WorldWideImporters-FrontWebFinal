import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnChanges {

  shoppingCart: Article[];
  subtotal:number;
  shipping:number=10;
  tax:number;
  total:Number;

  constructor(private shoppingCartService:ShoppingCartService) { 

  }

  ngOnInit() {
    this.shoppingCart=this.shoppingCartService.shoppingCart;
    this.shoppingCart.forEach(a => console.log("a : "+a.product.name));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['shoppingCart'])
    {
      this.subtotal=this.shoppingCart.map(a=>a.quantity*a.product.price).reduce((p1,p2)=>p1+p2);
      this.tax=this.subtotal*0.1;
      this.total=this.subtotal+this.shipping+this.tax;
    }
  }

}
