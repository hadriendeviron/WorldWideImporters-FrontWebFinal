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
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PersistenceModule } from 'angular-persistence';
import { ProductComponent } from './components/product/product.component';

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
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ShoppingComponent,
    ShoppingCartComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
