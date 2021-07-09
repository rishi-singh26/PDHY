import * as ActionTypes from "./ActionTypes";

export const Address = (
  state = {
    isLoading: false,
    data: [],
    errMess: null,
    defaultAddress: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ADDRESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
        defaultAddress: action.defaultAddress,
      };
    case ActionTypes.ADDRESSES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        data: [],
        defaultAddress: null,
      };
    case ActionTypes.ADDRESSES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        data: [],
        defaultAddress: null,
      };
    default:
      return state;
  }
};
