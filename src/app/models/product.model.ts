import {Category} from "./category.model";

export class Product {
  id?: number;

  name?: string;

  price?: number;

  url?: string;

  description?: string;

  category?: Category;

  file!: File;

  constructor(file: File) {
    this.file = file;
  }
}
