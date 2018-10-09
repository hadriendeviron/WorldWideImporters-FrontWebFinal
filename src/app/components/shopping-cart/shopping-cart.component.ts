import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Article } from '../../interfaces/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: Article[];
  subtotal:number;
  shipping:number=10;
  tax:number;
  total:Number;

  constructor(private shoppingCartService:ShoppingCartService, private router:Router) { 

  }

  ngOnInit() {

    this.shoppingCart=this.shoppingCartService.getShoppingCart();
    if(this.shoppingCart&&this.shoppingCart.length)this.calculateCart();
  }


  remove(index){
    this.shoppingCart.splice(index,1);
  }

  calculateCart(){
    this.subtotal=(Math.round(this.shoppingCart.map(a=>a.quantity*a.product.price).reduce((p1,p2)=>p1+p2)*100))/100;
    this.tax=(Math.round(this.subtotal*0.1*100))/100;
    this.total=(Math.round((this.subtotal+this.shipping+this.tax)*100))/100;
  }

  checkOutCart(){
    this.shoppingCartService.emptyShoppingCart();
    this.router.navigate(['/']);
  }

}
