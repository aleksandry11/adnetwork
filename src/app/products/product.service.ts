import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class ProductService {
    token: string;

    constructor(private http: HttpClient) {}

    getProducts(): Promise<any> {
        return this.http.get('http://smktesting.herokuapp.com/api/products/')
            .toPromise()
            .then(response => response);
    }
}