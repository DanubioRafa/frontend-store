import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';


const rootReducer = combineReducers({ categoryReducer, cartReducer });

export default rootReducer;