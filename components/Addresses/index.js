import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { primaryColor } from "../../shared/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  deleteAddress,
  setAddressAsDefault,
} from "../../Redux/Address/ActionCreator";
import { customAlert } from "../../shared/Functions";
import AddressShimmer from "./Components/AddressShimmer";

const addressLeftIconName = (id) => {
  if (id === 0) {
    return "home";
  }
  if (id === 1) {
    return "briefcase";
  }
  if (id === 2) {
    return "map-pin";
  }
};

export default function Addresses(props) {
  // global state
  const address = useSelector((state) => state.address);

  const { showActionSheetWithOptions } = useActionSheet();

  const dispatch = useDispatch();

  const openAddressMenuSheet = (selectedAddress) => {
    const options = selectedAddress.isDefault
      ? ["Edit", "Delete", "Cancel"]
      : ["Set as default", "Edit", "Delete", "Cancel"];
    const destructiveButtonIndex = selectedAddress.isDefault ? 1 : 2;
    const cancelButtonIndex = selectedAddress.isDefault ? 2 : 3;
    const textStyle = { fontWeight: "700", fontSize: 17 };

    const navigateToEditAddress = () => {
      props.navigation.navigate("CustomAddress", {
        address: selectedAddress,
        addressData: selectedAddress.automaticallyGeneratedAddress,
        coordsData: selectedAddress.coords,
        isEditing: true,
      });
    };

    const defaultAddressSetter = () => {
      address?.defaultAddress?._id
        ? dispatch(
            setAddressAsDefault(selectedAddress._id, address.defaultAddress._id)
          )
        : dispatch(setAddressAsDefault(selectedAddress._id, null));
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          selectedAddress.isDefault
            ? navigateToEditAddress()
            : defaultAddressSetter();
          return;
        } else if (buttonIndex === 1) {
          selectedAddress.isDefault
            ? deleteOneAddress(selectedAddress.addressName, selectedAddress._id)
            : navigateToEditAddress();
          return;
        } else if (buttonIndex === 2) {
          // console.log("Deleting address", selectedAddress._id);
          selectedAddress.isDefault
            ? null
            : deleteOneAddress(
                selectedAddress.addressName,
                selectedAddress._id
              );
          return;
        }
      }
    );
  };

  const deleteOneAddress = (addressName, addressId) => {
    // console.log({ addressName, addressId });
    customAlert(
      `Are you sure?`,
      `The address "${addressName}" will be deleted parmanently.`,
      () => dispatch(deleteAddress(addressId))
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("AddAddress");
          // dispatch(getAddresses());
        }}
        style={styles.addAddressTile}
      >
        <MaterialIcons
          name="my-location"
          size={22}
          color={primaryColor}
          style={{ marginLeft: 5 }}
        />
        <View style={styles.newAddressTxtView}>
          <Text style={styles.currentLocTxt}>Current location</Text>
          <Text style={{ color: primaryColor }}>Using GPS</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.savedAddressTxt}>SAVED ADDRESSES</Text>
      {address.isLoading ? <AddressShimmer numbers={[1, 2, 3]} /> : null}

      {address.data.length > 0 ? (
        <FlatList
          data={address.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.addressView}>
                <Feather
                  name={addressLeftIconName(item.addressTypeId)}
                  size={22}
                  style={{ marginHorizontal: 23 }}
                  color={primaryColor}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.addressNameTxt}>
                      {item.addressName}
                    </Text>
                    {item.isDefault ? (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={15}
                        color="green"
                      />
                    ) : null}
                  </View>
                  <Text style={{ color: "#666" }}>
                    {item.automaticallyGeneratedAddress[0].formatted}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    openAddressMenuSheet(item);
                  }}
                  style={{ padding: 20 }}
                >
                  <Feather name="more-vertical" size={20} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : !address.isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 23, fontWeight: "700", color: "#777" }}>
            NO SAVED ADDRESSES
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addAddressTile: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  newAddressTxtView: {
    marginLeft: 20,
  },
  currentLocTxt: {
    fontSize: 16,
    fontWeight: "700",
    color: primaryColor,
  },
  savedAddressTxt: {
    fontSize: 14,
    color: "#555",
    paddingHorizontal: 35,
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  addressView: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
  },
  addressNameTxt: {
    fontSize: 17,
    fontWeight: "700",
    marginVertical: 9,
    marginRight: 10,
  },
});
