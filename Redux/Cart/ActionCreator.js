import * as ActionTypes from "./ActionTypes";

export const addProductToCart =
  (product, pharmacyId, contactNo) => (dispatch) => {
    dispatch(addToCart(product, pharmacyId, contactNo));
  };

const addToCart = (product, pharmacyId, contactNo) => ({
  type: ActionTypes.ADD_PRODUCT,
  payload: product,
  pharmacyId: pharmacyId,
  contactNo: contactNo,
});

export const increaseProductCount = (indexOfProduct) => (dispatch) => {
  dispatch(increaseCount(indexOfProduct));
};

const increaseCount = (index) => ({
  type: ActionTypes.INCREASE_PRODUCT_COUNT,
  payload: index,
});

export const decreaseProductCount = (indexOfProduct) => (dispatch) => {
  dispatch(decreaseCount(indexOfProduct));
};

const decreaseCount = (index) => ({
  type: ActionTypes.DECREASE_PRODUCT_COUNT,
  payload: index,
});

export const deleteProductFromCart = (indexOfProductInCart) => (dispatch) => {
  dispatch(deleteFromCart(indexOfProductInCart));
};

const deleteFromCart = (indexOfProductInCart) => ({
  type: ActionTypes.DELETE_PRODUCT,
  payload: indexOfProductInCart,
});

export const clearCart = () => (dispatch) => {
  dispatch(deleteAllProducts());
};

const deleteAllProducts = () => ({
  type: ActionTypes.CLEAR_CART,
});

export const replaceCartItem = (newProduct) => (dispatch) => {
  dispatch(clearCartAndAddANewProduct());
};

const clearCartAndAddANewProduct = (newProduct) => ({
  type: ActionTypes.REPLACE_CART_ITEMS,
  payload: newProduct,
});
