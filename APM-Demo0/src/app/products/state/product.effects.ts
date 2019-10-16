import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, Effect, ofType} from '@ngrx/effects';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
@Injectable()
export class ProductEffects{
  constructor(private actions$:Actions, private productService: ProductService){

  }


  @Effect()
  //listening to all actions
  loadProduct$: Observable<Action>=this.actions$.pipe(
    //filtering load product action, dispatched from any of the view components
    ofType(productActions.ProductActionTypes.LoadProduct),

    mergeMap((action:productActions.LoadProduct) =>
      this.productService.getProducts().pipe(
        map((products:Product[]) => new productActions.LoadProductSuccess(products)),
        catchError(err => of(new productActions.LoadProductFail(err)))
      )
    )
  );

  @Effect()
    //listening to all actions
    updateProduct$: Observable<Action>=this.actions$.pipe(
      //filtering load product action, dispatched from any of the view components
      ofType(productActions.ProductActionTypes.UpdateProduct),
      map((action:productActions.UpdateProduct)=>action.payload),
      mergeMap((product:Product) =>
        this.productService.updateProduct(product).pipe(
          map(updatedProduct => new productActions.UpdateProductSuccess(updatedProduct)),
          catchError(err => of(new productActions.LoadProductFail(err)))
        )
      )
    );

}
