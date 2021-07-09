import * as ActionTypes from "./ActionTypes";

export const ShouldShow = (state = true, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_FLOATING_BTN:
      return (state = true);

    case ActionTypes.HIDE_FLOATING_BTN:
      return (state = false);

    default:
      return state;
  }
};
