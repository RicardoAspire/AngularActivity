import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getProducts(): Observable<product[]>{
    return this.httpClient.get<product[]>('/api/productsActivity');
  }

  getCoupons(): Observable<product[]>{
    return this.httpClient.get<product[]>('/api/couponsActivity');
  }
  
  getUsers(): Observable<product[]>{
    return this.httpClient.get<product[]>('/api/usersActivity');
  }

}
