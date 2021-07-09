import { auth, firestore } from "../../../Constants/Apis";
import { check_lat_lon, validateEmail } from "../../../shared/Functions";

export default class Doc {
  #name;
  #uprn;
  #specialization;
  #experiance;
  #email;
  #age;
  #phoneNumber;
  #city;
  #address;
  #automaticallyGeneratedAddress;
  #postalCode;
  #coords;
  #description;
  #education;
  #timing;
  #Image;
  #aadharImg;
  constructor() {
    this.description =
      "Doctor class creates a doctor object upon instantiation.";
    this.#name = null;
    this.#uprn = null;
    this.#specialization = null;
    this.#experiance = null;
    this.#email = null;
    this.#age = null;
    this.#phoneNumber = null;
    this.#city = null;
    this.#address = null;
    this.#automaticallyGeneratedAddress = null;
    this.#postalCode = null;
    this.#coords = null;
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

  getUprn = () => {
    return this.#uprn;
  };
  setUprn = (uprn) => {
    this.#uprn = uprn;
    return true;
  };

  getSpecialization = () => {
    return this.#specialization;
  };
  setSpecialization = (spec) => {
    if (spec && spec != "") {
      this.#specialization = spec;
      return true;
    }
    return false;
  };

  getExperience = () => {
    return this.#experiance;
  };
  setExperience = (exp) => {
    if (exp && Number.isInteger(parseInt(exp))) {
      this.#experiance = exp;
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

  getAge = () => {
    return this.#age;
  };
  setAge = (age) => {
    if (age && Number.isInteger(parseInt(age)) && parseInt(age) > 18) {
      this.#age = age;
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

  getDescription = () => this.#description;
  setDescription = (desc) => {
    this.#description = desc;
    return true;
  };
  getEducation = () => this.#education;
  setEducation = (edu) => {
    if (edu.length > 0) {
      this.#education = edu;
      return true;
    }
    return false;
  };

  getTiming = () => this.#timing;
  setTiming = (timing) => {
    if (timing.length > 0) {
      this.#timing = timing;
      return true;
    }
    return false;
  };

  getImage = () => this.#Image;
  setImage = (img) => {
    this.#Image = img;
    return true;
  };

  getAadharImage = () => this.#aadharImg;
  setAadharImage = (img) => {
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
      uprn: this.#uprn,
      specialization: this.#specialization,
      experiance: this.#experiance,
      email: this.#email,
      age: this.#age,
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
      discription: this.#description,
      education: this.#education,
      timing: this.#timing,
      Image: this.#Image,
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
  uploadDoctorData = async (
    data,
    optionalFuncOne = () => {},
    onErrorFunc = () => {},
    optionalFuncTwo = () => {}
  ) => {
    try {
      auth.currentUser
        ? firestore
            .collection("doctorApplications")
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
