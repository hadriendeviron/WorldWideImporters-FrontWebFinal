import { Injectable } from '@angular/core';
import {PersistenceService, StorageType, IPersistenceContainer} from 'angular-persistence';
import { Article } from '../interfaces/article';
import { container } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart:Array<Article>;

  constructor(private persistenceService:PersistenceService) {
        persistenceService.defineProperty<Array<Article>>(this,'shoppingCart', 'shoppingCartProperty' ,{type: StorageType.SESSION});
    
   }

  addToShoppingCart(article:Article){
    let curArt=this.shoppingCart.find(a=>a.product.name===article.product.name);
    if(curArt)
      curArt.quantity+=article.quantity;
      this.shoppingCart.push(article);
    }

    getShoppingCart(){
      return this.shoppingCart;
    }
}