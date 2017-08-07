import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../../product.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() id: any;
  url = 'http://smktesting.herokuapp.com/api/reviews/';
  message: string;
  reviews = <any>[];
  body = {
    rate: 1,
    text: ''
  };

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit() {
    this.url += this.id;
    Promise.resolve(this.http.get(this.url).toPromise().then(data => data))
        .then(data => this.reviews = data);
  }
  getArray(number) {
    let arr = [];
    for (let i = 0; i < number; i++) {
      arr.push(i + 1);
    }
    return arr;
  }
  getRate(event) {
    this.body.rate = event.target.previousElementSibling.value;
  }
  getReview(event: any) {
    this.body.text = event.target.value;
  }
  submitReview(event: any) {
    event.preventDefault();
    if (this.productService.token) {
      this.message = '';
      this.http.post<SubmitReviewRes>(`http://smktesting.herokuapp.com/api/reviews/${this.id}`, this.body, {
        headers: new HttpHeaders({'Authorization': 'Token ' + this.productService.token})
      }).subscribe(data => {
        if (data.success) {
          location.reload();
        }
      });
    } else {
      this.message = 'You should sign in to commit review';
      setTimeout(() => this.message = '', 5000);
    }
  }

}
interface SubmitReviewRes {
  success: boolean;
}