import { CHOSEN_CATEGORY, RESEARCHED_PRODUCT } from "../actions";

const INITIAL_STATE = {
  products: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
 switch(action.type) {
  case CHOSEN_CATEGORY:
    return {
      products: action.productsFromCategory,
    }
  case RESEARCHED_PRODUCT:
    return {
      products: action.productsFromSearch,
    }
   default:
    return state;
 }
}

export default categoryReducer;