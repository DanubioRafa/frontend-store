import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from "../actions"; 

const INITIAL_STATE = {
  productsOnCart: [],
  totalPrice: {},
};

const categoryReducer = (state = INITIAL_STATE, action) => {
 switch(action.type) {
  case ADD_ITEM_TO_CART:
    return {
      ...state,
      productsOnCart: [...state.productsOnCart, action.product],
    }
  case REMOVE_ITEM_FROM_CART:
    return {
      ...state,
      productsOnCart: state.productsOnCart.filter((productOnCart) => productOnCart !== action.product),
    }
   default:
    return state;
 }
}

export default categoryReducer;