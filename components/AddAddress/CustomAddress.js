import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Switch,
} from "react-native";
import { auth } from "../../Constants/Apis";
import {
  primaryColor,
  primaryErrColor,
  primaryLightColor,
} from "../../shared/Colors";
import { useSelector, useDispatch } from "react-redux";
import { createAddress, editAddress } from "../../Redux/Address/ActionCreator";
import CustomActivityIndicator from "../../shared/CustomActivityIndicator";

export default function CustomAddress(props) {
  // navigation params
  const { addressData, coordsData, isEditing } = props.route.params;
  const editableAddress = props?.route?.params?.address || null;
  // global state
  const address = useSelector((state) => state.address);
  // local state
  const [name, setName] = useState(
    isEditing ? editableAddress.addressHolderName : ""
  );
  const [mobile, setMobile] = useState(
    isEditing ? editableAddress.addressHolderMobileNumber : ""
  );
  const [addressName, setAddressName] = useState(
    isEditing ? editableAddress.addressName : ""
  );
  const [houseNumber, setHouseNumber] = useState(
    isEditing ? editableAddress.addressHouseNumber : ""
  );
  const [street, setStreet] = useState(
    isEditing ? editableAddress.addressStreet : ""
  );
  const [postalCode, setPostalCode] = useState(
    isEditing ? editableAddress.addressPostalCode : ""
  );
  const [addressTypeId, setAddressTypeId] = useState(
    isEditing ? editableAddress.addressTypeId : -1
  );
  const [isDefaultAddress, setIsDefaultAddress] = useState(
    isEditing
      ? editableAddress.isDefault
      : address.data.length > 0
      ? false
      : true
  );

  const [nameErr, setNameErr] = useState("");
  const [mobileErr, setMobileErr] = useState("");
  const [addressNameErr, setAddressNameErr] = useState("");
  const [houseNumberErr, setHouseNumberErr] = useState("");
  const [streetErr, setStreetErr] = useState("");
  const [postalCodeErr, setPostalCodeErr] = useState("");
  const [addressTypeErr, setAddressTypeErr] = useState("");

  const dispatch = useDispatch();

  const resetErrState = () => {
    setNameErr("");
    setMobileErr("");
    setAddressNameErr("");
    setHouseNumberErr("");
    setStreetErr("");
    setPostalCodeErr("");
    setAddressTypeErr("");
  };

  const shouldChangeDefault = () => {
    return isEditing
      ? address?.defaultAddress?._id === editableAddress?._id
        ? isDefaultAddress
          ? false
          : true
        : isDefaultAddress
        ? true
        : false
      : address.defaultAddress
      ? isDefaultAddress
        ? true
        : false
      : false;
  };

  const postAddressAfterDataValidation = () => {
    if (name === "") {
      resetErrState();
      setNameErr("Name can not be empty");
      return;
    }
    if (mobile.length < 10 || mobile.length > 10) {
      resetErrState();
      setMobileErr("Mobile number shoud be exactly 10 digits long");
      return;
    }
    if (addressName === "") {
      resetErrState();
      setAddressNameErr("Address name can not be empty");
      return;
    }
    if (houseNumber === "") {
      resetErrState();
      setHouseNumberErr("Field can not be empty");
      return;
    }
    if (street === "") {
      resetErrState();
      setStreetErr("Street can not be empty");
      return;
    }
    if (postalCode.length < 6 || postalCode.length > 6) {
      resetErrState();
      setPostalCodeErr("Postal code should be exactly 6 digits long");
      return;
    }
    if (addressTypeId === -1) {
      resetErrState();
      setAddressTypeErr("Select an address type");
      return;
    }
    resetErrState();
    const data = {
      addressHolderName: name,
      addressHolderMobileNumber: mobile,
      addressName: addressName,
      addressHouseNumber: houseNumber,
      addressStreet: street,
      addressPostalCode: postalCode,
      automaticallyGeneratedAddress: addressData,
      coords: coordsData,
      isDefault: isDefaultAddress,
      creationDate: isEditing ? editableAddress.creationDate : new Date(),
      updateDate: isEditing ? new Date() : null,
      userId: auth.currentUser.uid,
      addressTypeId: addressTypeId,
    };
    // console.log(
    //   "All data correct",
    //   data,
    //   isEditing ? editableAddress._id : "Not editiong",
    //   address?.defaultAddress?._id || null
    // );
    // props.navigation.navigate("Home");
    isEditing
      ? dispatch(
          editAddress(
            data,
            editableAddress._id,
            address?.defaultAddress?._id || null,
            () => props.navigation.navigate("Home"),
            shouldChangeDefault()
          )
        )
      : dispatch(
          createAddress(
            data,
            () => props.navigation.navigate("Home"),
            shouldChangeDefault(),
            address?.defaultAddress?._id || null
          )
        );
  };

  const toggleSwitch = () =>
    setIsDefaultAddress((previousState) => !previousState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {address.isLoading ? <CustomActivityIndicator /> : null}
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginVertical: 10 }}>
          <TextInput
            style={styles.textInput}
            placeholder={"Full Name"}
            keyboardType="default"
            textContentType="name"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            autoFocus={true}
          />
          {nameErr.length > 0 ? (
            <Text style={styles.errText}>{nameErr}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholder={"Mobile"}
            keyboardType="numeric"
            textContentType="telephoneNumber"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
            }}
          />
          {mobileErr.length > 0 ? (
            <Text style={styles.errText}>{mobileErr}</Text>
          ) : null}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            style={styles.textInput}
            placeholder={"Address name"}
            keyboardType="default"
            value={addressName}
            onChangeText={(text) => {
              setAddressName(text);
            }}
          />
          {addressNameErr.length > 0 ? (
            <Text style={styles.errText}>{addressNameErr}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholder={"House no./ Flat no./ Floor/ Building"}
            keyboardType="default"
            textContentType="streetAddressLine1"
            value={houseNumber}
            onChangeText={(text) => {
              setHouseNumber(text);
            }}
          />
          {houseNumberErr.length > 0 ? (
            <Text style={styles.errText}>{houseNumberErr}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholder={"Street"}
            keyboardType="default"
            textContentType="fullStreetAddress"
            value={street}
            onChangeText={(text) => {
              setStreet(text);
            }}
          />
          {streetErr.length > 0 ? (
            <Text style={styles.errText}>{streetErr}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholder={"Postal code"}
            keyboardType="numeric"
            textContentType="postalCode"
            value={postalCode}
            onChangeText={(text) => {
              setPostalCode(text);
            }}
          />
          {postalCodeErr.length > 0 ? (
            <Text style={styles.errText}>{postalCodeErr}</Text>
          ) : null}
        </View>
        <View style={styles.addressTypeView}>
          <FlatList
            data={["Home", "Office", "Other"]}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => setAddressTypeId(index)}
                  style={[
                    styles.addressType,
                    {
                      backgroundColor:
                        addressTypeId === index ? primaryColor : "#999",
                    },
                  ]}
                >
                  <Text style={styles.addressTypeTxt}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
          {addressTypeErr.length > 0 ? (
            <Text style={styles.errText}>{addressTypeErr}</Text>
          ) : null}
        </View>
        <View style={[styles.addressTypeView, styles.switchView]}>
          <Text style={styles.isDefaultAddressTxt}>Default address</Text>
          <Switch
            trackColor={{ false: "#f2f2f2", true: primaryColor }}
            thumbColor={isDefaultAddress ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDefaultAddress}
          />
        </View>
        <TouchableOpacity
          onPress={postAddressAfterDataValidation}
          style={styles.saveAddressBtn}
        >
          <Text style={styles.saveAddressBtnTxt}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
  },
  errText: {
    backgroundColor: "#fff",
    color: primaryErrColor,
    paddingHorizontal: 14,
    fontSize: 12,
    fontWeight: "700",
  },
  saveAddressBtn: {
    marginHorizontal: 65,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: primaryColor,
    borderRadius: 8,
    alignItems: "center",
  },
  saveAddressBtnTxt: { fontSize: 18, fontWeight: "700", color: "#fff" },
  addressTypeView: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
  addressType: {
    marginHorizontal: 12,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addressTypeTxt: { fontSize: 15, fontWeight: "700", color: "#fff" },
  switchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  isDefaultAddressTxt: { fontSize: 16, color: "#444" },
});
