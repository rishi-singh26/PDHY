import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../../Constants/Apis";
import { toast } from "../../shared/Functions";
import { getAddresses, addressesFailed } from "../Address/ActionCreator";
import { clearCart } from "../Cart/ActionCreator";

export const signUpUser = (userData) => (dispatch) => {
  dispatch(requestLogin());

  // console.log(userData);

  return auth
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((user) => {
      // dispatch(receiveLogin(user));
      userData.userId = auth.currentUser.uid;
      userData.isEmailVerified = false;
      delete userData.password;
      dispatch(saveUserData(userData, user));
    })
    .catch((err) => {
      console.log("Error in signup", err.message);
      dispatch(loginError(err.message));
      toast("Sign up failed");
    });
};

const saveUserData = (userData, user) => (dispatch) => {
  firestore
    .collection("userData")
    .add(userData)
    .then(() => {
      // console.log({
      //   mess: "User data added and login received",
      //   data: userData,
      // });
      dispatch(receiveLogin(userData));
      toast("Sign up successfull");
    })
    .catch((error) => {
      console.log("Error in saving user data ", error.message);
      dispatch(loginError(err.message));
      toast("Sign up failed");
    });
};

const getUserData = (user) => (dispatch) => {
  firestore
    .collection("userData")
    .where("userId", "==", user.uid)
    .get()
    .then((resp) => {
      let userData = [];
      resp.forEach((user) => {
        const data = user.data();
        const _id = user.id;
        userData.push({ _id, ...data });
      });
      // console.log("User data successfully fetched after login", userData);
      dispatch(receiveLogin(userData[0]));
      // toast("Sign up successfull");
    })
    .catch((error) => {
      console.log("Error in adding chat ", error.message);
      dispatch(loginError(err.message));
      toast("Sign up failed");
    });
};

const requestLogin = () => ({ type: ActionTypes.LOGIN_REQUEST });

const receiveLogin = (user) => ({ type: ActionTypes.LOGIN_SUCCESS, user });

const loginError = (message) => ({ type: ActionTypes.LOGIN_FAILURE, message });

export const loginUser = (creds) => (dispatch) => {
  // console.log(creds, "in action creator");
  dispatch(requestLogin());

  return auth
    .signInWithEmailAndPassword(creds.username, creds.password)
    .then(() => {
      var user = auth.currentUser;
      toast("Loging Successfull");
      dispatch(getAddresses());
      dispatch(getUserData(user));
      // console.log("Login success getting user data now");
      // dispatch(receiveLogin(user));
    })
    .catch((error) => {
      dispatch(loginError(error.message));
      toast(error.message);
    });
};

const requestLogout = () => ({ type: ActionTypes.LOGOUT_REQUEST });

const receiveLogout = () => ({ type: ActionTypes.LOGOUT_SUCCESS });

export const logoutUser =
  (toastMessage = "Logout successfull") =>
  (dispatch) => {
    dispatch(requestLogout());
    auth
      .signOut()
      .then(() => {
        toastMessage ? toast(toastMessage) : null;
        // Dispatching addresses failed to delete addresses on user logout
        dispatch(addressesFailed("User sign out"));
        // Dispatching clear cart action on user logout
        dispatch(clearCart());
      })
      .catch((error) => {
        // An error happened.
      });
    // dispatch(dataFailed("Unauthorized"));
    dispatch(receiveLogout());
  };
