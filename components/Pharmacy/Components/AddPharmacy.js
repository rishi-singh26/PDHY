import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import MapBox from "../../../shared/MapBox";
import styles, { SCREEN_WIDTH } from "../../../shared/Styles";
import Pharmacy from "./Pharmacy";
import { useDispatch } from "react-redux";
import { showSnack } from "../../../Redux/Snack/ActionCreator";
import Dilogue from "../../../shared/Components/Dilogue";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor, primaryErrColor } from "../../../shared/Colors";
import { pickImage, uploadImageToServer } from "../../../shared/Functions";
import { Assets } from "../../../assets";
import CustomActivityIndicator from "../../../shared/CustomActivityIndicator";

export default function Addpharmacy(props) {
  const [name, setName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState(""); // unique permanent registration number
  const [establishedIn, setEstablishedIn] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [automaticallyGeneratedAddress, setAutomaticallyGeneratedAddress] =
    useState("Loading...");
  const [coords, setCoords] = useState(null);
  const [showGenericStoreRadioOptions, setShowGenericStoreRadioOptions] =
    useState(false);
  const [isGenericStore, setIsGenericStore] = useState(false);
  const [closingTime, setClosingTime] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [aadharImg, setAadharImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);
    let pharmacy = new Pharmacy();
    let errorString = "";
    if (!pharmacy.setAddress(address)) {
      errorString += "Invalid address";
    }
    if (
      !pharmacy.setAutomaticallyGeneratedAddress(automaticallyGeneratedAddress)
    ) {
      errorString += "\nInvalid autometically generated address";
    }
    if (!pharmacy.setLiscenseNumber(licenseNumber)) {
      errorString += "\nInvalid liscense number";
    }
    if (!pharmacy.setEstablishedIn(establishedIn)) {
      errorString += "\nInvalid establishd in year";
    }
    if (!pharmacy.setCity(city)) {
      errorString += "\nInvalid city";
    }
    if (!pharmacy.setEmail(email)) {
      errorString += "\nInvalid email";
    }
    if (!pharmacy.setName(name)) {
      errorString += "\nInvalid name";
    }
    if (!pharmacy.setPhoneNum(phoneNumber)) {
      errorString += "\nInvalid phone number";
    }
    if (!pharmacy.setPostalCode(postalCode)) {
      errorString += "\nInvalid postal code";
    }
    if (!pharmacy.setCoords(coords)) {
      errorString += "\nIncorrect location";
    }
    if (!pharmacy.setIsGenericStore(isGenericStore)) {
      errorString += "\nSet store type";
    }
    if (!pharmacy.setOpenTill(closingTime)) {
      errorString += "\nClosing time is not correct";
    }
    const imageUris = await uploadImages();
    if (!imageUris[0].status || !imageUris[1].status) {
      dispatch(showSnack("Error in submitting application, please try again"));
      setIsLoading(false);
      return;
    }
    if (!pharmacy.setImage(imageUris[0].downloadUri)) {
      errorString += "\nIncorrect profile image";
    }
    if (!pharmacy.setAadharImg(imageUris[1].downloadUri)) {
      errorString += "\nIncorrect aadhar image";
    }

    if (errorString != "") {
      dispatch(showSnack(errorString));
      setIsLoading(false);
    } else {
      pharmacy.uploadPharmacyData(
        pharmacy.getUploadableData(),
        () => dispatch(showSnack("Application submitted")),
        () =>
          dispatch(
            showSnack("Error in submitting application, please try again")
          ),
        () => props.navigation.goBack()
      );
      setIsLoading(false);
    }
  };

  const getImage = async (type) => {
    const { status, result } = await pickImage();
    if (!status) {
      dispatch(showSnack("Error wile picking image, please try again"));
      return;
    }
    if (type == 0) {
      setProfileImg(result);
    } else if ((type = 1)) {
      setAadharImg(result);
    }
  };

  const images = [
    { img: profileImg, name: "Profile" },
    { img: aadharImg, name: "Aadhar" },
  ];

  const uploadImages = async () => {
    let imageUris = [];
    for (let i = 0; i < images.length; i++) {
      const data = await uploadImageToServer(
        images[i].img,
        "pharmacy",
        images[i].name
      );
      console.log(data);
      imageUris.push(data);
    }
    return imageUris;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && <CustomActivityIndicator />}
      <ScrollView>
        <MapBox
          height={350}
          pinStyle={{ top: "39.5%", right: "41.5%" }}
          addressSetter={(address) => {
            setAutomaticallyGeneratedAddress(address);
          }}
          regionSetter={(region) => {
            setCoords(region);
          }}
        />
        <View style={locStyles.autoGenAddView}>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Automatically generated address
          </Text>
          <Text style={{ fontSize: 15, paddingVertical: 10 }}>
            {automaticallyGeneratedAddress != "Loading..."
              ? automaticallyGeneratedAddress[0].formatted
              : automaticallyGeneratedAddress}
          </Text>
        </View>
        <View style={locStyles.imageView}>
          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    locStyles.images,
                    { marginRight: index % 2 != 0 ? 10 : 0 },
                  ]}
                  onPress={() => getImage(index)}
                >
                  <Image
                    source={
                      item?.img?.uri ? { uri: item.img.uri } : Assets.noImg
                    }
                    style={locStyles.imageStyle}
                  />
                  <Text style={{ paddingTop: 10, fontSize: 17 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder="Name"
          style={[styles.textInput, { marginTop: 7 }]}
          textContentType="name"
        />
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.textInput}
          textContentType="emailAddress"
        />
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          keyboardType="number-pad"
          placeholder="Phone number"
          style={styles.textInput}
          textContentType="telephoneNumber"
        />
        <TextInput
          value={licenseNumber}
          onChangeText={(text) => {
            setLicenseNumber(text);
          }}
          placeholder="License number"
          style={[styles.textInput, { marginTop: 7 }]}
        />
        <TextInput
          value={establishedIn}
          onChangeText={(text) => {
            setEstablishedIn(text);
          }}
          placeholder="Established in (year)"
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TextInput
          value={city}
          onChangeText={(text) => {
            setCity(text);
          }}
          placeholder="City"
          style={[styles.textInput, { marginTop: 7 }]}
          textContentType="addressCity"
        />
        <TextInput
          value={address}
          onChangeText={(text) => {
            setAddress(text);
          }}
          placeholder="Address"
          style={styles.textInput}
          textContentType="streetAddressLine1"
        />
        <TextInput
          value={postalCode}
          onChangeText={(text) => {
            setPostalCode(text);
          }}
          keyboardType="number-pad"
          placeholder="Postal code"
          style={styles.textInput}
          textContentType="postalCode"
        />
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => setShowGenericStoreRadioOptions(true)}
        >
          <Text style={{ fontSize: 16, color: "#aaa" }}>
            Are you a generic medicine store
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: isGenericStore ? primaryColor : primaryErrColor,
            }}
          >
            {isGenericStore ? "Yes" : "No"}
          </Text>
        </TouchableOpacity>
        <TextInput
          value={closingTime}
          onChangeText={(text) => {
            setClosingTime(text);
          }}
          placeholder="Closing time - example: 09:00 PM"
          style={[styles.textInput, { marginTop: 7 }]}
        />
      </ScrollView>
      <TouchableOpacity style={locStyles.sendDataBtn} onPress={handleSubmit}>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>
          Send data for validation
        </Text>
      </TouchableOpacity>
      <Dilogue
        cancellable={true}
        closeDilogue={() => setShowGenericStoreRadioOptions(false)}
        dilogueBackground={"#fff"}
        dilogueVisible={showGenericStoreRadioOptions}
      >
        {["Yes", "No"].map((item, index) => {
          let color = isGenericStore
            ? index == 0
              ? primaryColor
              : "#444"
            : index == 1
            ? primaryColor
            : "#444";
          return (
            <TouchableOpacity
              style={locStyles.genericStoreOption}
              onPress={() => {
                setIsGenericStore(index == 0);
                setShowGenericStoreRadioOptions(false);
              }}
            >
              <Ionicons
                name={"radio-button-on"}
                color={color}
                size={18}
                style={{ paddingHorizontal: 10 }}
              />
              <Text style={{ fontSize: 16, color: "#444", flex: 1 }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Dilogue>
    </SafeAreaView>
  );
}

const locStyles = StyleSheet.create({
  genericStoreOption: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  autoGenAddView: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 7,
  },
  imageView: {
    backgroundColor: "#fff",
    marginTop: 7,
    paddingVertical: 10,
  },
  sendDataBtn: {
    backgroundColor: "#3b73ff",
    paddingVertical: 10,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  images: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 7,
  },
  imageStyle: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: SCREEN_WIDTH / 2 - 15,
    width: SCREEN_WIDTH / 2 - 15,
  },
});
