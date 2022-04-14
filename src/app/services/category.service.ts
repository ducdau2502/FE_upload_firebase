import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_CATEGORY = environment.API_LOCAL + 'categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_CATEGORY);
  }
}
