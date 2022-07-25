export const CHOSEN_CATEGORY = 'CHOSEN_CATEGORY';
export const RESEARCHED_PRODUCT = 'RESEARCHED_PRODUCT';

export const chooseCategory = (productsFromCategory) => ({ type: CHOSEN_CATEGORY, productsFromCategory});

export const searchProduct = (productsFromSearch) => ({ type: RESEARCHED_PRODUCT, productsFromSearch});


export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

export const addItemToCart = (product) => ({ type: ADD_ITEM_TO_CART, product});
export const removeItemFromCart = (product) => ({ type: REMOVE_ITEM_FROM_CART, product});
