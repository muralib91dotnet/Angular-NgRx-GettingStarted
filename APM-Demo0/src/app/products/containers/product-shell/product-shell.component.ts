import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Subscription } from 'rxjs';

import { Product } from '../../product';
import { ProductService } from '../../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  errorMessage$: Observable<string>;

  displayCode$: Observable<boolean>;

  // products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product>;
  // componentActive: boolean=true;
  products$: Observable<Product[]>;
  // errorMessage$: Observable<string>;
  // sub: Subscription;

  constructor(private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );
    //OR    
    this.store.dispatch(new productActions.LoadProduct());

    this.products$=this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;

    this.errorMessage$=this.store.pipe(select(fromProduct.getError));

    this.selectedProduct$=this.store.pipe(select(fromProduct.getCurrentProduct));

    this.displayCode$=this.store.pipe(select(fromProduct.getShowProductCode));
 
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

  }


  checkChanged(value: boolean): void {
    // this.displayCode = value;

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
