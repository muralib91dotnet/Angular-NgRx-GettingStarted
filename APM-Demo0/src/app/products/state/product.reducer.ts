import * as fromRoot from '../../state/app.state';
import { Product } from '../product';

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

export function reducer(state: ProductState, action):ProductState{
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