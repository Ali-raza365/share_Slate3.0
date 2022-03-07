import { combineReducers } from 'redux';
import {
    User_Reducer,

} from './reducers';

export const RootReducer = combineReducers({
    user: User_Reducer,
});