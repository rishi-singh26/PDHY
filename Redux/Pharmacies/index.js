import * as ActionTypes from "./ActionTypes";

export const Pharmacies = (
  state = {
    isLoading: false,
    data: [],
    errMess: null,
    favourites: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PHARMACIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };
    case ActionTypes.PHARMACIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        data: [],
      };
    case ActionTypes.PHARMACIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        data: [],
      };
    default:
      return state;
  }
};
