import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { FormsModule, Validators } from '@angular/forms';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PersistenceModule } from 'angular-persistence';
import { ProductComponent } from './components/product/product.component';
import { ProductListService } from './services/product-list.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaxValueDirective } from './directives/max-value.directive';
import { IsPositiveIntegerDirective } from './directives/is-positive-integer.directive';

const appRoutes: Routes = [
  {
    path:'',
    component:HomePageComponent
  },{
    path:'shopping',
    component:ShoppingComponent
  },{
    path:'cart',
    component:ShoppingCartComponent
  },{
    path:'product/:name',
    component:ProductComponent
  },{
    path:'contact',
    component:ContactUsComponent
  },{
    path:'about',
    component:AboutUsComponent
  },{
    path:'**', 
    component:NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ShoppingComponent,
    ShoppingCartComponent,
    ProductComponent,
    NotFoundComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoadingComponent,
    MaxValueDirective,
    IsPositiveIntegerDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    PersistenceModule
  ],
  providers: [ProductListService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
