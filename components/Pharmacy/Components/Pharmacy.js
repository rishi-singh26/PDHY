import { auth, firestore } from "../../../Constants/Apis";
import { check_lat_lon, validateEmail } from "../../../shared/Functions";

export default class Pharmacy {
  #name;
  #liscenseNumber;
  #establishedIn;
  #email;
  #phoneNumber;
  #city;
  #address;
  #automaticallyGeneratedAddress;
  #postalCode;
  #coords;
  #isGenericStore;
  #openTill;
  #image;
  #aadharImg;
  constructor() {
    this.description =
      "Pharmacy class creates a doctor object upon instantiation.";
    this.#name = null;
    this.#liscenseNumber = null;
    this.#establishedIn = null;
    this.#email = null;
    this.#phoneNumber = null;
    this.#city = null;
    this.#address = null;
    this.#automaticallyGeneratedAddress = null;
    this.#postalCode = null;
    this.#coords = null;
    this.#isGenericStore = false;
    this.openTill = null;
    this.#image = null;
    this.#aadharImg = null;
  }

  getName = () => {
    return this.#name;
  };
  setName = (name) => {
    if (name && name != "") {
      this.#name = name;
      return true;
    }
    return false;
  };

  getLiscenseNumber = () => {
    return this.#liscenseNumber;
  };
  setLiscenseNumber = (liscNum) => {
    this.#liscenseNumber = liscNum;
    return true;
  };

  getEstablishedIn = () => {
    return this.#establishedIn;
  };
  setEstablishedIn = (establishedIn) => {
    if (establishedIn && Number.isInteger(parseInt(establishedIn))) {
      this.#establishedIn = establishedIn;
      return true;
    }
    return false;
  };

  getEmail = () => {
    return this.#email;
  };
  setEmail = (email) => {
    if (validateEmail(email)) {
      this.#email = email;
      return true;
    }
    return false;
  };

  getPhoneNum = () => {
    return this.#phoneNumber;
  };
  setPhoneNum = (phone) => {
    if (phone && Number.isInteger(parseInt(phone)) && phone.length == 10) {
      this.#phoneNumber = phone;
      return true;
    }
    return false;
  };

  getCity = () => {
    return this.#city;
  };
  setCity = (city) => {
    if (city && city != "") {
      this.#city = city;
      return true;
    }
    return false;
  };

  getAddress = () => {
    return this.#address;
  };
  setAddress = (address) => {
    if (address && address != "") {
      this.#address = address;
      return true;
    }
    return false;
  };

  getAutomaticallyGeneratedAddress = () => {
    return this.#automaticallyGeneratedAddress;
  };

  setAutomaticallyGeneratedAddress = (autoGenAdd) => {
    if (autoGenAdd && autoGenAdd != "") {
      this.#automaticallyGeneratedAddress = autoGenAdd;
      return true;
    }
    return false;
  };

  getPostalCode = () => {
    return this.#postalCode;
  };

  setPostalCode = (code) => {
    if (code && code != "" && code.length == 6) {
      this.#postalCode = code;
      return true;
    }
    return false;
  };

  getCoords = () => {
    return this.#coords;
  };

  /**
   * Sets the location coordinates for a doctor
   * @param {Object} coords
   * @returns boolean
   */
  setCoords = (coords) => {
    if (coords && check_lat_lon(coords.latitude, coords.longitude)) {
      this.#coords = coords;
      return true;
    }
    return false;
  };

  getIsGenericStore = () => this.#isGenericStore;
  setIsGenericStore = (isGeneric) => {
    if (typeof isGeneric == "boolean") {
      this.#isGenericStore = isGeneric;
      return true;
    }
    return false;
  };

  getOpenTill = () => this.#openTill;
  setOpenTill = (opnTill) => {
    if (opnTill.length > 0) {
      this.#openTill = opnTill;
      return true;
    }
    return false;
  };

  getImage = () => this.#image;
  setImage = (img) => {
    this.#image = img;
    return true;
  };

  getAadharImg = () => this.#aadharImg;
  setAadharImg = (img) => {
    this.#aadharImg = img;
    return true;
  };

  /**
   *
   * @returns Object
   */
  getUploadableData = () => {
    let uploadableData = {
      name: this.#name,
      liscenseNumber: this.#liscenseNumber,
      establishedIn: this.#establishedIn,
      email: this.#email,
      phoneNumber: this.#phoneNumber,
      city: this.#city,
      address: this.#address,
      automaticallyGeneratedAddress: this.#automaticallyGeneratedAddress,
      postalCode: this.#postalCode,
      coords: this.#coords,
      applicationSubmitionDate: new Date(),
      applicationSubmitedByUser: auth.currentUser.uid,
      statusId: 0,
      statusType: "Submitted",
      status: {
        id: 0,
        type: "Submitted",
      },
      isGenericStore: this.#isGenericStore,
      openTill: this.#openTill,
      image: this.#image,
      aadharImg: this.#aadharImg,
    };
    return uploadableData;
  };

  /**
   *
   * @param {Object} data
   * @param {Dispatch} reduxActionDicpatcher
   * @param {Function} optionalFuncOne - Optional
   * @param {Function} optionalFuncTwo - Optional
   * @param {Function} onErrorFunc - Optional
   */
  uploadPharmacyData = async (
    data,
    optionalFuncOne = () => {},
    onErrorFunc = () => {},
    optionalFuncTwo = () => {}
  ) => {
    try {
      auth.currentUser
        ? firestore
            .collection("pharmacyApplications")
            .add(data)
            .then(() => {
              optionalFuncOne();
              optionalFuncTwo();
            })
        : onErrorFunc();
    } catch (error) {
      onErrorFunc();
    }
  };
}
