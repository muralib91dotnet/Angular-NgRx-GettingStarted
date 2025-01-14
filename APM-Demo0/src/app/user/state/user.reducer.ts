import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ToggleMaskUserName, UserActionTypes, UserActions } from './user.action';

export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

//Selector functions
const getUserFeatureState=createFeatureSelector<UserState>('user');

//Selector functions for each property of ProductState
export const getMaskUserName=createSelector(
    getUserFeatureState,
    //projector function: gets result of selector function
    state=>state.maskUserName
);

export const getCurrentUser=createSelector(
    getUserFeatureState,
    //projector function: gets result of selector function
    state=>state.currentUser
);

export function reducer(state=initialState, action:UserActions){
    switch(action.type){
        case UserActionTypes.MaskUserName:
                console.log(UserActionTypes.MaskUserName);
                console.log('existing state:'+ JSON.stringify(state));
                console.log('payload:'+ action.payload)
            return {
                ...state,
                maskUserName: action.payload
            }

        default:
            return state;
    }
}
