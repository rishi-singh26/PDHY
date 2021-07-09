import * as ActionTypes from "./ActionTypes";

export const Doctors = (
  state = {
    isLoading: false,
    data: [],
    errMess: null,
    favourites: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DOCTORS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };
    case ActionTypes.DOCTORS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        data: [],
      };
    case ActionTypes.DOCTORS_FAILED:
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
