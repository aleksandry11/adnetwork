import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../products/product.service';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnChanges {
  form: FormGroup;
  message: string;
  body = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private productService: ProductService, private fb: FormBuilder, private router: Router) {
      this.createForm();
  }

  ngOnInit(): void {}
  ngOnChanges() {
      this.form.reset();
  }
  createForm() {
      this.form = this.fb.group({
          name: new FormControl(),
          pass: new FormControl()
      });
  }

  getUsername(event: any) {
    this.body.username = event.target.value;
  }
  getPassword(event: any) {
    this.body.password = event.target.value;
  }
  submitReg(event: any): void {
    event.preventDefault();
    if (!this.body.username || !this.body.password) {
        this.message = 'Вы не ввели данные';
        return;
    }
    this.form.reset();
    this.http.post<RegResponse>('http://smktesting.herokuapp.com/api/register/', this.body)
        .subscribe(data => {
          if (!data.success) {
            this.message = data.message;
          }
          this.productService.token = data.token;
          this.message = 'Registration successful';
          setTimeout(() => this.message = '', 2000);
        });
  }
  logIn(event: any): void {
    event.preventDefault();
    if (!this.body.username || !this.body.password) {
        this.message = 'Вы не ввели данные';
        return;
    }
    this.form.reset();
    this.http.post<LogResponse>('http://smktesting.herokuapp.com/api/login/', this.body)
        .subscribe(data => {
          console.log(data);
          if (!data.success) {
              this.message = data.message;
          } else {
              this.productService.token = data.token;
              this.message = 'Login success';
              setTimeout(() => this.message = '', 2000);
              this.router.navigate(['/']);
          }
        });
  }
}

interface RegResponse {
  success: boolean;
  message: string;
  token: string;
}
interface LogResponse {
  message: string;
  success: boolean;
  token: string;
}
