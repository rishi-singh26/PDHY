import { auth, firestore } from "../../Constants/Apis";
import { toast } from "../../shared/Functions";
import * as ActionTypes from "./ActionTypes";

const getDefaultAddress = (addressesArr) => {
  let defaultAddress = null;
  addressesArr.map((item) => (item.isDefault ? (defaultAddress = item) : null));
  return defaultAddress;
};

export const getAddresses = () => (dispatch) => {
  if (!auth.currentUser) {
    toast("Unauthorised");
    return;
  }
  dispatch(addressesLoading());
  return firestore
    .collection("addresses")
    .where("userId", "==", auth.currentUser.uid)
    .get()
    .then((resp) => {
      let addressesData = [];
      resp.forEach((address) => {
        const data = address.data();
        const _id = address.id;
        addressesData.push({ _id, ...data });
      });
      const defaultAddress = getDefaultAddress(addressesData);
      dispatch(addAddress(addressesData, defaultAddress));
    })
    .catch((err) => {
      dispatch(addressesFailed(err.message));
      console.log("Here is error from getting addresses", err.message);
    });
};

export const createAddress = (
  address,
  navigationFunc = () => console.log("No func"),
  shouldChangeDefault,
  currentDefaultAddressId
) => (dispatch) => {
  if (!auth.currentUser) {
    toast("Unauthorised");
    return;
  }
  dispatch(addressesLoading());
  return firestore
    .collection("addresses")
    .add(address)
    .then((resp) => {
      navigationFunc(); //used for navigation after adding hte address
      shouldChangeDefault
        ? dispatch(
            setIsDefaultToFalse(currentDefaultAddressId, "Address added")
          )
        : dispatch(getAddresses()) && toast("Address added");
    })
    .catch((err) => {
      dispatch(addressesFailed(err.message));
      console.log(err.message);
    });
};

export const deleteAddress = (addressId) => (dispatch) => {
  if (!auth.currentUser) {
    toast("Unauthorised");
    return;
  }
  // console.log("Here is address id from action creator", addressId);
  dispatch(addressesLoading());
  return firestore
    .collection("addresses")
    .doc(addressId)
    .delete()
    .then(() => {
      toast("Address deleted");
      dispatch(getAddresses());
    })
    .catch(() => {
      toast("Error in deleting address, please try again");
    });
};

const addressesLoading = () => ({
  type: ActionTypes.ADDRESSES_LOADING,
});

export const addressesFailed = (message) => ({
  type: ActionTypes.ADDRESSES_FAILED,
  payload: message,
});

const addAddress = (addressesArr, defaultAddress) => ({
  type: ActionTypes.ADD_ADDRESS,
  payload: addressesArr,
  defaultAddress,
});

export const editAddress = (
  editedAddress,
  addressId,
  currentDefaultAddressId,
  navigationFunc = () => console.log("No func"),
  shouldChangeDefault
) => (dispatch) => {
  if (!auth.currentUser) {
    toast("Unauthorised");
    return;
  }
  dispatch(addressesLoading());
  firestore
    .collection("addresses")
    .doc(addressId)
    .update(editedAddress)
    .then(() => {
      // console.log("Address edited successfully.");
      shouldChangeDefault
        ? dispatch(setIsDefaultToFalse(currentDefaultAddressId))
        : dispatch(getAddresses()) && toast("Address edited successfully.");
      navigationFunc();
    })
    .catch((err) => {
      toast("Error in editing address");
      dispatch(addressesFailed());
      console.log("Errr in editing data ACTION CREATOR", err.message);
    });
};

const setIsDefaultToFalse = (
  currentDefaultAddressId,
  toastMessage = "Address edited successfully."
) => (dispatch) => {
  if (!auth.currentUser) {
    toast("Unauthorised");
    return;
  }
  if (!currentDefaultAddressId) {
    // console.log("Not changiing default address.");
    dispatch(getAddresses());
    toast(toastMessage);
    return;
  }
  firestore
    .collection("addresses")
    .doc(currentDefaultAddressId)
    .update({ isDefault: false })
    .then(() => {
      dispatch(getAddresses());
      toast(toastMessage);
      // console.log("Default address changed successfully.");
    })
    .catch((err) => {
      console.log(
        "Changing default address failed ACTION CREATOR",
        err.message
      );
    });
};

export const setAddressAsDefault = (
  newDefaultAddressId,
  oldDefaultAddressId
) => (dispatch) => {
  if (!auth.currentUser) {
    toast("Unauthorised");
    return;
  }
  // console.log({ newDefaultAddressId, oldDefaultAddressId });
  firestore
    .collection("addresses")
    .doc(newDefaultAddressId)
    .update({ isDefault: true })
    .then(() => {
      if (oldDefaultAddressId) {
        firestore
          .collection("addresses")
          .doc(oldDefaultAddressId)
          .update({ isDefault: false })
          .then(() => {
            dispatch(getAddresses());
            // console.log("Default change done");
            toast("Address set as default");
          });
      } else {
        toast("Address set as default");
        dispatch(getAddresses());
      }
    });
};
