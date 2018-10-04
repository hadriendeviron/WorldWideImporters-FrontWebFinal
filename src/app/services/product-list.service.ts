import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, reduce} from 'rxjs/operators'
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private searchResult:Observable<Array<Category>>
  constructor(private http: HttpClient) { }

  getAll =():Observable<Array<Category>>=>{

    if(!this.searchResult){
      this.searchResult= this.http.get<Array<Category>>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe<Array<Category>>(map((response)=>{
        response.forEach(c=>c.subcategories.forEach(s=>s.items.forEach(p=>p.isFeatured=(Math.random()>0.92))))
          return response
      }))
    }
    return this.searchResult
  }

  get=(name):Observable<Product[]>=>{
    return this.getAll().pipe(reduce<Category[],Product[]>((a,b:Category):Array<Product>=>
    {
      return a.concat(b.subcategories.reduce((c,d):Array<Product>=>c.concat(d.items),new Array<Product>()))
    },new Array<Product>()));
  }
  
}
