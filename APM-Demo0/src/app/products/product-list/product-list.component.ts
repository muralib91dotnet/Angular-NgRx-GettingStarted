import { Component, OnInit, OnDestroy } from '@angular/core';

// import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive: boolean=true;
  products$: Observable<Product[]>;
  // sub: Subscription;

  constructor(private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    //TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getCurrentProduct),
    takeWhile(()=>this.componentActive)
    ).subscribe(
      currentProduct=>{
        this.selectedProduct=currentProduct
      }
    );

    //dispatch an action to fire the getProducts http api call
    //this action observed by the product effect
    this.store.dispatch(new productActions.LoadProduct());

    //listening to getProducts selector
    this.products$=this.store.pipe(select(fromProduct.getProducts));
    // .subscribe((products:Product[])=>{
    //   this.products=products;
    // })
    //above pair of store calls to fire & observe http api call responese,
    //which replaces the typical single http observable, in the alternate commented below

    //OR
    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    //TODO: Unsubscribe
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      productCode=>{
        this.displayCode=productCode
      }
    )
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.componentActive=false;
  }

  checkChanged(value: boolean): void {
    this.displayCode = value;

    this.store.dispatch(new productActions.ToggleProductCode(value));

  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct())
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
