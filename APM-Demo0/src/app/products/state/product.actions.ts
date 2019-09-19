import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionTypes{
    ToggleProductCode='[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
    LoadProduct='[Product] Load Product List',
    LoadProductSuccess='[Product] Load Product Success',
    LoadProductFail='[Product] Load Product Fail'
}

//Action creator classes for each action
export class ToggleProductCode implements Action{
    readonly type=ProductActionTypes.ToggleProductCode;

    constructor(public payload:boolean){

    }
}

export class SetCurrentProduct implements Action{
    readonly type=ProductActionTypes.SetCurrentProduct;

    constructor(public payload:Product){

    }
}

//This Action has no constructor, since clear action does not need any input parameter
export class ClearCurrentProduct implements Action{
    readonly type=ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
  }

  //Action creators for all actions
export class LoadProduct implements Action {
  readonly type = ProductActionTypes.LoadProduct;
}

export class LoadProductSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductSuccess;

  constructor(public payload:Product[]){}
}

export class LoadProductFail implements Action {
  readonly type = ProductActionTypes.LoadProductFail;

  constructor(public payload:string){}
}

//Uniontype of All actions
export type ProductActions =
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | LoadProduct
  | LoadProductSuccess
  | LoadProductFail;

