import * as fromRoot from '../../state/app.state';
import { Product } from '../product';
import { createFeatureSelector, createSelector } from '@ngrx/store';

//Root App's state inherited and then product state added to it
//This is done, since Products module is lazy loaded AND product state removed from root app state interface
export interface State extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProduct: boolean;
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

export function reducer(state: ProductState=initialState, action):ProductState{
    switch(action.type){
        case 'TOGGLE_PRODUCT_CODE':
            console.log('existing state:'+ JSON.stringify(state));
            console.log('payload:'+ action.payload) 
            return {
                ...state,
                showProductCode: action.payload,

            };

        default:
            return state;
    }
}