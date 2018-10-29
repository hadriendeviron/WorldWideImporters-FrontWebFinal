import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductListService } from '../../services/product-list.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild('carousel') carousel: NgbCarousel;
  private items:Array<Product>
  loading: boolean;
  constructor(private productsSearch: ProductListService) { }

  ngOnInit() {
    this.loading=true;
    this.items=new Array<Product>();
    this.productsSearch.getAll().subscribe((response)=>{
      this.loading=false;
      response.forEach(r=>r.subcategories.forEach(s=>this.items=this.items.concat(s.items.filter(i=>i.isFeatured))))
    })
  }

  carouselPause(){
    this.carousel.pause();
  }

  carouselCycle(){
    this.carousel.cycle()
  }

}
