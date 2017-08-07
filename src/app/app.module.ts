import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdTabsModule, MdInputModule, MdButtonModule } from '@angular/material';

import { ProductService } from './products/product.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ReviewsComponent } from './products/product-info/reviews/reviews.component';

const appRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'registration', component: AuthComponent },
  { path: 'model/:id', component: ProductInfoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsComponent,
    ProductInfoComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdTabsModule,
    MdInputModule,
    MdButtonModule,
    RouterModule.forRoot(
        appRoutes,
        {enableTracing: true}
    )
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
