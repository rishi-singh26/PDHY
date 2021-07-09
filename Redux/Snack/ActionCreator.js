import * as ActionTypes from "./ActionTypes";

/**
 *
 * @param {String} message
 * @param {String} actionTxt - Optional
 * @param {String} action - Optional
 * @returns
 */
export const showSnack =
  (message, actionTxt = "OKAY", action = () => {}) =>
  (dispatch) => {
    // console.log("Showing snack");
    dispatch({
      type: ActionTypes.SHOW_SNACK,
      payload: { message, actionTxt, action },
    });
  };

export const hideSnack = () => (dispatch) => {
  dispatch({ type: ActionTypes.HIDE_SNACK });
};
