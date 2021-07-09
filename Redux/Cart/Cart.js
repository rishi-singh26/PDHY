import * as ActionTypes from "./ActionTypes";

export const Cart = (
  state = {
    products: [],
    pharmacyId: null,
    contactNo: null,
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        pharmacyId: action.pharmacyId,
        contactNo: action.contactNo,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.INCREASE_PRODUCT_COUNT:
      const indexOfProductCountInc = action.payload; // index of product whose count is to be increased
      const productCountInc = { ...state.products[indexOfProductCountInc] }; // product whose count is to be increased
      productCountInc.productCountInCart =
        productCountInc.productCountInCart + 1; // increase count
      const currentProductsInCart = [...state.products]; // all products in cart
      currentProductsInCart.splice(indexOfProductCountInc, 1, productCountInc); //put that product back in cart

      // console.log(
      //   "Products after increaseing product count",
      //   currentProductsInCart
      // );
      return {
        ...state,
        products: currentProductsInCart,
      };

    case ActionTypes.DECREASE_PRODUCT_COUNT:
      const indexOfProductCountDec = action.payload; // index of product whose count is to be decreased
      const currentProductsInCartToBeDecresed = [...state.products]; // all products in cart
      currentProductsInCartToBeDecresed[indexOfProductCountDec]
        .productCountInCart > 1
        ? (currentProductsInCartToBeDecresed[
            indexOfProductCountDec
          ].productCountInCart -= 1)
        : currentProductsInCartToBeDecresed.splice(indexOfProductCountDec, 1);

      return {
        ...state,
        products: currentProductsInCartToBeDecresed,
      };

    case ActionTypes.DELETE_PRODUCT:
      let currentProducts = [...state.products];
      const pharmacyId = currentProducts.length === 1 ? null : state.pharmacyId;
      const contactNum = currentProducts.length === 1 ? null : state.contactNo;
      currentProducts.splice(action.payload, 1);

      console.log(currentProducts);

      return {
        ...state,
        products: currentProducts,
        pharmacyId: pharmacyId,
        contactNo: contactNum,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        products: [],
        pharmacyId: null,
        contactNo: null,
      };

    case ActionTypes.REPLACE_CART_ITEMS:
      return {
        ...state,
        products: [action.payload],
      };

    default:
      return state;
  }
};
