import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit{
  id: number;
  currentProduct = {
    id: '',
    title: '',
    img: '',
    text: ''
  };
  imageLink = 'http://smktesting.herokuapp.com/static/';
  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(p => this.id = +p['id']);
    Promise.resolve(this.productService.getProducts().then(data => data[this.id - 1]))
        .then(value => {
          this.currentProduct = Object.assign({}, value);
        });
  }
}
