import * as ActionTypes from "./ActionTypes";

export const showFloatingBtn = () => (dispatch) => {
  dispatch(showBtn());
};

const showBtn = () => ({
  type: ActionTypes.SHOW_FLOATING_BTN,
});

export const hideFloatingBtn = () => (dispatch) => {
  dispatch(hideBtn());
};

const hideBtn = () => ({
  type: ActionTypes.HIDE_FLOATING_BTN,
});
