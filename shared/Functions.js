import { Platform } from "react-native";
import * as Location from "expo-location";
import Toast from "react-native-simple-toast";
import { Alert } from "react-native";
import * as geolib from "geolib";
import { auth, cloudStorage, geoCoderApi } from "../Constants/Apis";
import Axios from "axios";
import * as ImagePicker from "expo-image-picker";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function getStringMonth(monthNum) {
  return months[monthNum];
}

export function GetCartTotalPrice(object) {
  var cartTotal = 0;
  for (var i = 0; i < object.length; i++) {
    cartTotal += object[i].priceOfTenTabs * object[i].productCountInCart;
  }
  return cartTotal.toFixed(1);
}

export function GetWhatsappTextFromCart(
  cartObject,
  custormerName,
  customerAddress,
  pharmacyName
) {
  var string =
    "Hi, I want to order some medicines.\nI am '" +
    custormerName +
    "'" +
    "\n\nI want these medicines with a recipt from\n" +
    "'" +
    pharmacyName +
    "'" +
    ".\n\nThe delivery address is\n'" +
    customerAddress +
    "'\n\n" +
    "My order is \n";
  cartObject.map((medicine) => {
    string = `${string}${medicine.medicineName} ${
      medicine.productCountInCart
    }\t\t${medicine.priceOfTenTabs} * ${medicine.productCountInCart} = ₹ ${
      medicine.priceOfTenTabs * medicine.productCountInCart
    }\n`;
  });
  string += "\n\nCart total\t\t" + "₹" + GetCartTotalPrice(cartObject);
  return string;
}

export async function getLocation() {
  try {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      // console.log("Permission to access location was denied");
      return { location: null, errmess: "Permission denied", status: false };
    }
    let location = await Location.getCurrentPositionAsync({});
    // console.log("Here is locatio data", location);
    return { location: location, errmess: null, status: true };
  } catch (err) {
    return { location: null, errmess: err.message, status: false };
  }
}

export function validateEmail(email) {
  const emailRe =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email !== "" && emailRe.test(String(email).toLowerCase())) return true;
  else return false;
}

export function toast(message) {
  Toast.show(message, Toast.LONG, Toast.BOTTOM);
  // Toast.show(message, Toast.SHORT, ['UIAlertController',"RCTModalHostViewController"]);
}

export function customAlert(message, text, onOkPress, cancelable = true) {
  Alert.alert(
    message,
    text,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => onOkPress(),
        style: "default",
      },
    ],
    { cancelable: cancelable }
  );
}

export async function getUserPlace() {
  const { status, errmess, location } = await getLocation();
  if (!status) {
    return { status: false, message: errmess };
  }
  const latLong = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  // console.log(latLong);
  const url = geoCoderApi(latLong.latitude, latLong.longitude);

  try {
    const addressData = await Axios.get(url);
    const { total_results, results } = addressData.data;

    const addressComponents = results[0]?.components;
    const formattedAddress = results[0].formatted;

    const usableAddressData = getAddressComponents(addressComponents);
    usableAddressData.formattedAddress = formattedAddress;
    // console.log("Here is useable address data", results[0]?.components);
    return usableAddressData;
  } catch (err) {
    const data = { status: false, message: err.message };
    console.log(data);
    return data;
  }
}

export function getAddressComponents(addressComponents) {
  const placeName =
    addressComponents?.city ||
    addressComponents?.town ||
    addressComponents?.village;
  const district = addressComponents?.state_district;
  const road = addressComponents?.road;
  const county = addressComponents?.county;
  const state = addressComponents?.state;
  const state_code = addressComponents?.state_code;
  const country = addressComponents?.country;
  const country_code = addressComponents?.country_code;

  const data = {
    placeName,
    district,
    road,
    county,
    state,
    state_code,
    country,
    country_code,
    status: true,
    message: "successfull",
  };
  return data;
}

export function getCityIdFromName(name) {
  if (name.includes("Mysuru")) return 1;
  if (name.includes("Mandya")) return 0;
  if (name.includes("Bengalore") || name.includes("Bengaluru")) return 2;
  return 3;
}
export function getCityIdFromNameForPharmaciew(name) {
  if (name.includes("Mysuru")) return 1;
  if (name.includes("Mandya")) return 2;
  if (name.includes("Bangalore") || name.includes("Bengaluru")) return 3;
  return 5;
}

/**
 * Validates a pair of lattitude and longitude
 * @param {String} lat
 * @param {String} lon
 * @returns boolean
 */
export function check_lat_lon(lat, lon) {
  let ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  let ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

  var validLat = ck_lat.test(lat);
  var validLon = ck_lon.test(lon);
  if (validLat && validLon) {
    return true;
  } else {
    return false;
  }
}

/**
 * Convert seconds to date object
 * @param {Number} secs
 * @returns Date Object
 */
export function convertSecondsTODate(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

/**
 * opens image picjer native app
 * @returns Objext { status, result }
 */
export async function pickImage() {
  if (Platform.OS === "web") {
    alert("Device not supported.");
    return { status: false, result: null };
  }
  console.log("Not on web");
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return { status: false, result: null };
  }
  // console.log("Permission granted");
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 0.5,
    });
    // console.log("Here is image result", result);
    if (result.cancelled) {
      return { status: false, result: null };
    }
    return { status: true, result };
  } catch (err) {
    console.log(err.message);
    return { status: false, result: null };
  }
}

/**
 * @param {Object} imageData
 * @param {String} path
 * @returns {Object} {status: Boolean, downloadUri: URL}
 * image data must be like
 * { image: "image uri", name: "image name" }
 * uploads one image to firebase storage. The image data provided must be an Object then uploads that url to firestore to be used in the app returns an object { status, downloadUri }
 */
export async function uploadImageToServer(imageData, path, imgType) {
  // console.log("Starting upload");
  const response = await fetch(imageData.uri);
  const blob = await response.blob();
  try {
    const result = await cloudStorage
      .ref()
      .child(`${path}/images/` + `${auth.currentUser.uid}_${path}_${imgType}`) //Image name will be UID_doctor_Profile or UID_doctor_Aadhar or UID_pharmacy_Profile or UID_pharmacy_Aadhar
      .put(blob);
    const photoDownloadURL = await result.ref.getDownloadURL();
    console.log(
      `Here is the download url ${photoDownloadURL}\nUploading to firestore`
    );
    blob.close();
    return { status: true, downloadUri: photoDownloadURL };
  } catch (err) {
    console.log("Error in uploading iamge to server FUNCTIONS", err.message);
    return { status: false, downloadUri: null };
  }
}

/**
 * Takes an array of objects, a search key and a search param in the object and return an array of objects with matching param
 * @param {Array} array
 * @param {String} searchKey
 * @param {String} searchParam
 * @returns Array
 */
export function searchArrayOfObjects(array, searchKey, searchParam) {
  var finalArr = [];
  array.map((item) => {
    if (item[searchParam]) {
      searchKey.toUpperCase().includes(item[searchParam].toUpperCase()) ||
      item[searchParam].toUpperCase().includes(searchKey.toUpperCase())
        ? finalArr.push(item)
        : null;
    }
  });

  return finalArr;
}
