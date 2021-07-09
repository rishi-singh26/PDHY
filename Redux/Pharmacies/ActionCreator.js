import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../../Constants/Apis";

export const getPharmacies = (cityId) => (dispatch) => {
  console.log("Fetching pharmacies");
  if (!auth.currentUser) {
    console.log("Unauthorised");
    return;
  }

  dispatch(pharmaciesLoading());

  firestore
    .collection("pharmacies")
    .where("cityId", "==", cityId)
    .get()
    .then((resp) => {
      let pharmaciesData = [];
      resp.forEach((pharmacy) => {
        const data = pharmacy.data();
        const _id = pharmacy.id;
        pharmaciesData.push({ _id, ...data });
      });
      dispatch(addPharmacies(pharmaciesData));
      console.log("Pharmacies data", pharmaciesData.length);
    })
    .catch((err) => {
      dispatch(pharmaciesFailed(err.message));
      console.log("Error in fetching pharmacies ACTION CREATORS", err.message);
    });
};

const pharmaciesLoading = () => ({
  type: ActionTypes.PHARMACIES_LOADING,
});

const pharmaciesFailed = (message) => ({
  type: ActionTypes.PHARMACIES_FAILED,
  payload: message,
});

const addPharmacies = (doctersData) => ({
  type: ActionTypes.ADD_PHARMACIES,
  payload: doctersData,
});
