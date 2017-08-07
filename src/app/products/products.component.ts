import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  imageLink = 'http://smktesting.herokuapp.com/static/';
  constructor(private http: HttpClient, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().then(data => this.products = data);
  }
  onClick(id) {
      this.router.navigate(['/model', id]);
  }
}
