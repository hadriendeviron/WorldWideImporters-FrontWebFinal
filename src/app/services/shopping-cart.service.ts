import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart:Array<Article>;

  constructor() {
    this.shoppingCart=new Array<Article>();
   }

  addToShoppingCart(article:Article){
    let curArt=this.shoppingCart.find(a=>a.product.name===article.product.name);
    if(curArt)
      curArt.quantity+=article.quantity;
    else
      this.shoppingCart.push(article);
    }

    getShoppingCart(){
      return this.shoppingCart;
    }

    emptyShoppingCart(){
      this.shoppingCart=new Array<Article>();
    }
}
