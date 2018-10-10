import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, reduce, filter, subscribeOn} from 'rxjs/operators'
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private searchResult:Observable<Array<Category>>
  private cashedResult:Array<Category>


  constructor(private http: HttpClient) { }

  getAll =():Observable<Array<Category>>=>{
    if(!this.cashedResult){
      this.cashedResult=new Array<Category>();
      this.searchResult= this.http.get<Array<Category>>('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json').pipe<Array<Category>>(map((response)=>{
        response.forEach(c=>
          {
            this.cashedResult.push(c);
            c.subcategories.forEach(s=>s.items.forEach(
              

            p=>{
              //random selection of featured items
              p.isFeatured=(Math.random()>0.92)
              p.cashedStock=Number.parseInt(p.stock);
            }
          ))
        })
          return response
      }))
    }
    else{
      this.searchResult=Observable.create(observer=>{
        setTimeout(()=>{
        observer.next(this.cashedResult);
        observer.complete();
        observer.error(new Error("Error while fetching data from cash"));
        
      },2000);


      })
    }
    return this.searchResult;
  }

  get=(name):Observable<Product>=>{
    return this.getAll().pipe(reduce((a,b:Category[]):Array<Product>=>
    {
      return a.concat(b.reduce<Array<Product>>((e:Array<Product>,f):Array<Product>=>e.concat(f.subcategories.reduce((c,d):Array<Product>=>c.concat(d.items),new Array<Product>())), new Array<Product>()))
    },new Array<Product>()),map(p=>p.find(pr=>pr.name===name)));
  }

  removeFromCashedStock=(name, quantity)=>{
    this.get(name).subscribe((o)=>{
      o.cashedStock-=quantity;
    })
  }
  
}
