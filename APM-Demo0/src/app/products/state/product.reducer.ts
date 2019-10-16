import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from './product.actions';
import { act } from '@ngrx/effects';
import { error } from '@angular/compiler/src/util';

//Root App's state inherited and then product state added to it
//This is done, since Products module is lazy loaded AND product state removed from root app state interface
export interface State extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error:string;
}

const initialState: ProductState={
    showProductCode:true,
    currentProductId: null,
    products:[],
    error:''
};

//selector to get slice of product('products') state, from entire app state
const getProductFeatureState=createFeatureSelector<ProductState>('products');

//Selector functions for each property of ProductState
export const getShowProductCode=createSelector(
    getProductFeatureState,
    //projector function: gets result of selector function
    state=>state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct=createSelector(
    getProductFeatureState,
    //projector function: gets result of selector function
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
          return {
            id: 0,
            productName: '',
            productCode: 'New',
            description: '',
            starRating: 0
          };
        } else {
          return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
      }
);

export const getProducts=createSelector(
    getProductFeatureState,
    //projector function: gets result of selector function
    state=>state.products
);

export const getError=createSelector(
  getProductFeatureState,
  //projector function: gets result of selector function
  state=>state.error
);

export function reducer(state: ProductState=initialState, action:ProductActions):ProductState{
    switch(action.type){
        case ProductActionTypes.ToggleProductCode:
            // console.log('existing state:'+ JSON.stringify(state));
            // console.log('payload:'+ action.payload)
            return {
                ...state,
                showProductCode: action.payload,

            };

        case ProductActionTypes.InitializeCurrentProduct:
            return{
                ...state,
                currentProductId:0
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId:action.payload.id
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId:null
            };

        case ProductActionTypes.LoadProductSuccess:
          return {
            ...state,
            products:action.payload,
            error:''
          }

        case ProductActionTypes.LoadProductFail:
          return {
            ...state,
            products:[],
            error:action.payload
          }

        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts=state.products.map(item=>item.id===action.payload.id?action.payload:item)
            return {
                ...state,
                products:updatedProducts,
                currentProductId:action.payload.id,
                error:''
            }

        case ProductActionTypes.UpdateProductFail:
                return {
                    ...state,
                    error:action.payload
                }

        default:
            return state;
    }
}
