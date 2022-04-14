import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {CategoryListComponent} from "./components/category-list/category-list.component";

const routes: Routes = [
  {
    path: "products",
    component: ProductListComponent
  },
  {
    path: "categories",
    component: CategoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
