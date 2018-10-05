import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, reduce, filter} from 'rxjs/operators'
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private searchResult:Observable<Array<Category>>
  //todo delete
  index:number=0;

  constructor(private http: HttpClient) { }

  getAll =():Observable<Array<Category>>=>{
    console.log(this.index++)
    if(!this.searchResult){
      console.log("launch query")
      this.searchResult= this.http.get<Array<Category>>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe<Array<Category>>(map((response)=>{
        response.forEach(c=>c.subcategories.forEach(s=>s.items.forEach(p=>p.isFeatured=(Math.random()>0.92))))
          return response
      }))
    }
    return this.searchResult
  }

  get=(name):Observable<Product>=>{
    return this.getAll().pipe(reduce((a,b:Category[]):Array<Product>=>
    {
      return a.concat(b.reduce<Array<Product>>((e:Array<Product>,f):Array<Product>=>e.concat(f.subcategories.reduce((c,d):Array<Product>=>c.concat(d.items),new Array<Product>())), new Array<Product>()))
    },new Array<Product>()),map(p=>p.find(pr=>pr.name===name)));
  }
  
}
