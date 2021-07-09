import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from "../../Constants/Apis";

export const getDoctors = (cityId) => (dispatch) => {
  if (!auth.currentUser) {
    console.log("Unauthorised");
    return;
  }

  dispatch(doctorsLoading());

  firestore
    .collection("doctors")
    .where("cityId", "==", cityId)
    .get()
    .then((resp) => {
      let doctorsData = [];
      resp.forEach((doctor) => {
        const data = doctor.data();
        const _id = doctor.id;
        doctorsData.push({ _id, ...data });
      });
      dispatch(addDoctors(doctorsData));
      console.log("Doctor data", doctorsData.length);
    })
    .catch((err) => {
      dispatch(doctorsFailed(err.message));
      console.log("Error in fetching doctors ACTION CREATORS", err.message);
    });
};

const doctorsLoading = () => ({
  type: ActionTypes.DOCTORS_LOADING,
});

const doctorsFailed = (message) => ({
  type: ActionTypes.DOCTORS_FAILED,
  payload: message,
});

const addDoctors = (doctersData) => ({
  type: ActionTypes.ADD_DOCTORS,
  payload: doctersData,
});
