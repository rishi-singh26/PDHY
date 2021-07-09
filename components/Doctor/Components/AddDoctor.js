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
import { useDispatch } from "react-redux";
import { showSnack } from "../../../Redux/Snack/ActionCreator";
import { pickImage, uploadImageToServer } from "../../../shared/Functions";
import MapBox from "../../../shared/MapBox";
import styles, { SCREEN_WIDTH } from "../../../shared/Styles";
import Doc from "./Doc";
import { Assets } from "../../../assets";
import CustomActivityIndicator from "../../../shared/CustomActivityIndicator";

export default function Adddoctor(props) {
  const [name, setName] = useState("");
  const [uprn, setUprn] = useState(""); // unique permanent registration number
  const [specialization, setSpecialization] = useState("");
  const [experaince, setExperaince] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [automaticallyGeneratedAddress, setAutomaticallyGeneratedAddress] =
    useState("Loading...");
  const [coords, setCoords] = useState(null);
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [aadharImg, setAadharImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setIsLoading(true);
    let doctor = new Doc();
    let errorString = "";
    if (!doctor.setAddress(address)) {
      errorString += "Invalid address";
    }
    if (
      !doctor.setAutomaticallyGeneratedAddress(automaticallyGeneratedAddress)
    ) {
      errorString += "\nInvalid autometically generated address";
    }
    if (!doctor.setAge(age)) {
      errorString += "\nInvalid age";
    }
    if (!doctor.setCity(city)) {
      errorString += "\nInvalid city";
    }
    if (!doctor.setEmail(email)) {
      errorString += "\nInvalid email";
    }
    if (!doctor.setExperience(experaince)) {
      errorString += "\nInvalid experiance";
    }
    if (!doctor.setName(name)) {
      errorString += "\nInvalid name";
    }
    if (!doctor.setPhoneNum(phoneNumber)) {
      errorString += "\nInvalid phone number";
    }
    if (!doctor.setPostalCode(postalCode)) {
      errorString += "\nInvalid postal code";
    }
    if (!doctor.setSpecialization(specialization)) {
      errorString += "\nInvalid specialization";
    }
    if (!doctor.setUprn(uprn)) {
      errorString += "\nInvalid UPRN";
    }
    if (!doctor.setCoords(coords)) {
      errorString += "\nIncorrect location";
    }
    if (!doctor.setDescription(description)) {
      errorString += "\nInvalid description";
    }
    if (!doctor.setEducation(education)) {
      errorString += "\nInvalid edication";
    }
    if (!doctor.setTiming(`${startTime} - ${endTime}`)) {
      errorString += "\nIncorrect location";
    }
    const imageUris = await uploadImages();
    if (!imageUris[0].status || !imageUris[1].status) {
      dispatch(showSnack("Error in submitting application, please try again"));
      setIsLoading(false);
      return;
    }
    if (!doctor.setImage(imageUris[0].downloadUri)) {
      errorString += "\nIncorrect profile image";
    }
    if (!doctor.setAadharImage(imageUris[1].downloadUri)) {
      errorString += "\nIncorrect aadhar image";
    }

    if (errorString != "") {
      dispatch(showSnack(errorString));
      setIsLoading(false);
    } else {
      doctor.uploadDoctorData(
        doctor.getUploadableData(),
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
        "doctor",
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
            // console.log("Here is the region", region);
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
            numColumns={2}
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
          placeholder="Full Name"
          style={[styles.textInput, { marginTop: 7 }]}
          textContentType="name"
        />
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email"
          style={styles.textInput}
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          keyboardType="number-pad"
          placeholder="Whatsapp number - only 10 digits"
          style={styles.textInput}
          textContentType="telephoneNumber"
        />
        <TextInput
          value={uprn}
          onChangeText={(text) => {
            setUprn(text);
          }}
          placeholder="Unique permanent registration number"
          style={[styles.textInput, { marginTop: 7 }]}
        />
        <TextInput
          value={specialization}
          onChangeText={(text) => {
            setSpecialization(text);
          }}
          placeholder="Specialization"
          style={styles.textInput}
        />
        <TextInput
          value={experaince}
          onChangeText={(text) => {
            setExperaince(text);
          }}
          placeholder="Experiance in years"
          style={styles.textInput}
          keyboardType="number-pad"
        />
        <TextInput
          value={age}
          onChangeText={(text) => {
            setAge(text);
          }}
          keyboardType="number-pad"
          placeholder="Age : greater then 18"
          style={[styles.textInput, { marginTop: 7 }]}
        />
        <TextInput
          value={address}
          onChangeText={(text) => {
            setAddress(text);
          }}
          placeholder="Address (clinic or hospital address)"
          style={styles.textInput}
          textContentType="streetAddressLine1"
        />
        <TextInput
          value={city}
          onChangeText={(text) => {
            setCity(text);
          }}
          placeholder="City"
          style={styles.textInput}
          textContentType="addressCity"
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
        <TextInput
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          placeholder="Write about yourself, your introduction"
          style={[styles.textInput, { marginTop: 7 }]}
          multiline
        />
        <TextInput
          value={education}
          onChangeText={(text) => {
            setEducation(text);
          }}
          placeholder="Write about your education"
          style={styles.textInput}
          multiline
        />
        <TextInput
          value={startTime}
          onChangeText={(text) => {
            setStartTime(text);
          }}
          placeholder="Time at which you start work (09:00 AM)"
          style={[styles.textInput, { marginTop: 7 }]}
        />
        <TextInput
          value={endTime}
          onChangeText={(text) => {
            setEndTime(text);
          }}
          placeholder="Time at which you end work (05:00 PM)"
          style={styles.textInput}
        />
      </ScrollView>
      <TouchableOpacity style={locStyles.sendDataBtn} onPress={handleSubmit}>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>
          Send data for validation
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const locStyles = StyleSheet.create({
  autoGenAddView: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 7,
  },
  imageView: {
    backgroundColor: "#fff",
    marginTop: 7,
    padding: 10,
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
    height: SCREEN_WIDTH / 2 - 60,
    width: SCREEN_WIDTH / 2 - 60,
  },
});
