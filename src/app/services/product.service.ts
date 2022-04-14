import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_PRODUCT = environment.API_LOCAL + 'products';

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_PRODUCT);
  }

  search(search: any): Observable<Product[]> {
    let params = new HttpParams().set("search", search);
    return this.http.get<Product[]>(this.API_PRODUCT + `/search`, {params});
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(this.API_PRODUCT +`/${id}`);
  }

  deleteProductById(id: any): Observable<Product> {
    return this.http.delete<Product>(this.API_PRODUCT +`/${id}`);
  }

  saveProduct(product: { price: any; name: any; description: any; id: any; category: { id: any }; url: any }): Observable<Product> {
    return this.http.post<Product>(this.API_PRODUCT, product);
  }

  updateProduct(product: Product, id: any): Observable<Product> {
    return this.http.put<Product>(this.API_PRODUCT +`/${id}`, product);
  }
}
