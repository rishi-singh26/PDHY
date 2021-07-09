import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SCREEN_HEIGHT } from "../../shared/Styles";
import {
  showFloatingBtn,
  hideFloatingBtn,
} from "../../Redux/ShowFloatingGoToCartBtn/ActionCreator";
import { useDispatch } from "react-redux";
import { primaryColor } from "../../shared/Colors";
import { toast } from "../../shared/Functions";
import MapBox from "../../shared/MapBox";

export default function AddAddress(props) {
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState("Loading...");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideFloatingBtn());
    return () => {
      dispatch(showFloatingBtn());
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <MapBox
        height={550}
        pinStyle={{ top: "43%", right: "41.5%" }}
        addressSetter={(address) => {
          setAddress(address);
        }}
        regionSetter={(region) => {
          setRegion(region);
        }}
      />
      <View
        style={{
          height: SCREEN_HEIGHT - 620,
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text style={styles.label}>Automatically generated address</Text>
          <Text style={styles.address}>
            {address != "Loading..." ? address[0].formatted : address}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            address != "Loading..."
              ? props.navigation.navigate("CustomAddress", {
                  addressData: address,
                  coordsData: region,
                  isEditing: false,
                })
              : toast("Please wait while we get your accurate address");
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 15,
    marginBottom: 5,
    marginTop: 15,
  },
  address: {
    fontSize: 15,
    marginHorizontal: 15,
    marginBottom: 5,
    marginTop: 15,
    color: "#555",
    height: 37,
  },
  confirmBtn: {
    backgroundColor: primaryColor,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
