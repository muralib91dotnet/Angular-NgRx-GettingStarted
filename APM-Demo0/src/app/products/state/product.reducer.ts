import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from './product.actions';

//Root App's state inherited and then product state added to it
//This is done, since Products module is lazy loaded AND product state removed from root app state interface
export interface State extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState={
    showProductCode:true,
    currentProduct:null,
    products:[]
};

//selector to get slice of product('products') state, from entire app state
const getProductFeatureState=createFeatureSelector<ProductState>('products');

//Selector functions for each property of ProductState
export const getShowProductCode=createSelector(
    getProductFeatureState,
    //projector function: gets result of selector function
    state=>state.showProductCode
);

export const getCurrentProduct=createSelector(
    getProductFeatureState,
    //projector function: gets result of selector function
    state=>state.currentProduct
);

export const getProducts=createSelector(
    getProductFeatureState,
    //projector function: gets result of selector function
    state=>state.products
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
                currentProduct:{
                    id: 0,
                    productName: '',
                    productCode: 'NEW',
                    description: '',
                    starRating: 0
                }
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct:{...action.payload}
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct:null
            };

        case ProductActionTypes.LoadProductSuccess:
          return {
            ...state,
            products:action.payload
          }

        default:
            return state;
    }
}
