import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {Category} from "../../models/category.model";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {finalize, Observable} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product!: Product;
  products!: Product[];
  categories!: Category[];
  id!: number;
  searchText: string = "";
  fb: any;
  downloadURL!: Observable<string>;

  createForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    url: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl('')
  })

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCategories();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data
    });
  }

  getProduct(id: any) {
    this.productService.getProductById(id).subscribe(data => {

      this.openModal();
      // @ts-ignore
      document.getElementById("modalHeader").innerHTML = "Update Product";
      // @ts-ignore
      document.getElementById("saveProduct").innerHTML = "Update Product";
      this.fb = data.url;
      this.createForm = new FormGroup({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        url: new FormControl(data.url),
        description: new FormControl(data.description),
        category: new FormControl(data.category?.id)
      });
    })
  }

  search() {
    if (this.searchText == "") {
      this.getAllProduct();
    } else {
      this.productService.search(this.searchText).subscribe(data => {
        this.products = data;
      })
    }
  }

  onFileSelected(event: any) {
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb)
        });
      })
    ).subscribe();
  }

  saveProduct() {
    const form = this.createForm.value;
    console.log(this.fb);
    const product = {
      id: form.id,
      name: form.name,
      price: form.price,
      url: this.fb,
      description: form.description,
      category: {
        id: form.category
      }
    }
    this.productService.saveProduct(product).subscribe(() => {
      this.cloneModal();
      this.getAllProduct();
    })
  }

  deleteProduct(id: any) {
    this.productService.deleteProductById(id).subscribe(() => {
        this.getAllProduct();
      }
    )
  }


  openModal() {
    // @ts-ignore
    document.getElementById("myModal").style.display = "block";
    // @ts-ignore
    document.getElementById("saveProduct").innerHTML = "Create Product";
    // @ts-ignore
    document.getElementById("modalHeader").innerHTML = "Create Product";
  }

  cloneModal() {
    this.createForm.reset();
    // @ts-ignore
    document.getElementById("myModal").style.display = "none";
    window.onclick = function (ev) {
      if (ev.target == document.getElementById("myModal")) {
        // @ts-ignore
        document.getElementById("myModal").style.display = "none";
      }
    }
  }

}
