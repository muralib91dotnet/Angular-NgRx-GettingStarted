import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, Effect, ofType} from '@ngrx/effects';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';
@Injectable()
export class ProductEffects{
  constructor(private actions$:Actions, private productService: ProductService){

  }


  @Effect()
  loadProduct$=this.actions$.pipe(
    ofType(productActions.ProductActionTypes.LoadProduct),

    mergeMap((actions:productActions.LoadProduct) =>
      this.productService.getProducts().pipe(
        map((products:Product[]) => {new productActions.LoadProductSuccess(products)}),
        catchError(err => of(new productActions.LoadProductFail(err)))
      )
    )
  );

}
