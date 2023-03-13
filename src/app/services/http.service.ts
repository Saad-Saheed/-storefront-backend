import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient ) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('./assets/data.json');
  }

  async getProduct(id: number): Promise<Product>{
    const products = await this.getProducts().pipe().toPromise() as Product[];
    return products.find(p => p.id == id) as Product;
  }

}
