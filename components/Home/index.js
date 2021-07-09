import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";
import Header from "../Header";
import RenderCard from "./Components/RenderCard";
import { getUserPlace, toast } from "../../shared/Functions";
import { Assets } from "../../assets";
import { primaryColor } from "../../shared/Colors";
import { useDispatch } from "react-redux";
import { show3BtnAlert, showAlert } from "../../Redux/Alert/ActionCreator";

export default function Home(props) {
  // local state
  const [userAddress, setUserAddress] = useState("Loading...");
  const [refreshing, setRefreshing] = useState(true);
  const [userAddressErr, setUserAddressErr] = useState(false);

  // redux action dispatcher
  const dispatch = useDispatch();

  const userLiveLocation = async () => {
    setRefreshing(true);
    setUserAddress("Loading...");
    try {
      console.log("Getting address");
      const userLocData = await getUserPlace();
      const { status, message } = userLocData;
      if (status) {
        setUserAddress(userLocData);
        console.log("Here is loc data", userLocData);
        // !Message: getting doctors from doctors page not from home page ||| dispatch(getDoctors(getCityIdFromName(userLocData.placeName)));
        // !Message: getting pharmacies from pharmacy page not from home page ||| dispatch(getPharmacies(getCityIdFromName(userLocData.placeName)));
        setRefreshing(false);
        setUserAddressErr(false);
      } else {
        setUserAddress("Not available");
        dispatch(
          show3BtnAlert(
            "Err while getting your location, please try again.",
            "",
            () => {},
            "Cancel",
            () => userLiveLocation(),
            "Try again"
          )
        );
        setRefreshing(false);
        setUserAddressErr(true);
      }
    } catch (err) {
      setUserAddress("Not available");
      dispatch(
        show3BtnAlert(
          "Err while getting your location, please try again.",
          "",
          () => {},
          "Cancel",
          () => userLiveLocation(),
          "Try again"
        )
      );
      setRefreshing(false);
      setUserAddressErr(true);
    }
  };

  useEffect(() => {
    userLiveLocation();
  }, []);

  const goToScreen = (screen, navigationData = null) => {
    navigationData
      ? props.navigation.navigate(screen, navigationData)
      : props.navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        title={userAddress?.placeName || "P.D.H.Y"}
        onUserAvatarPress={() => {
          props.navigation.navigate("Profile");
        }}
        onLocationPress={() => {
          props.navigation.navigate("Addresses");
        }}
        address={
          userAddress === "Loading..."
            ? userAddress
            : userAddress.formattedAddress
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[primaryColor, "#fff"]}
            refreshing={refreshing}
            onRefresh={() => userLiveLocation()}
          />
        }
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>P.D.H.Y</Text>
          <Text style={styles.cardSubTitle}>
            Pharmacy | Doctor | Home Remedies | Yoga
          </Text>
        </View>
        <RenderCard
          onPress={() => {
            userAddressErr || refreshing
              ? toast("Address not available")
              : goToScreen("Pharmacy", { userLocationData: userAddress });
          }}
          title={"Pharmacy"}
          subTitle={"List of pharmacies near you"}
          showImg={true}
          imageSource={Assets.pharmacyCover}
        />
        <RenderCard
          onPress={() => {
            userAddressErr || refreshing
              ? toast("Address not available")
              : goToScreen("Doctor", { userLocationData: userAddress });
          }}
          title={"Doctor"}
          subTitle={"List of doctors near you"}
          showImg={true}
          imageSource={Assets.doctorCover}
        />
        <RenderCard
          onPress={() => {
            goToScreen("HomeRemedies");
          }}
          title={"Home remedies"}
          // subTitle={"List of doctors near you"}
          showImg={true}
          imageSource={Assets.homeRemedies}
        />
        <RenderCard
          onPress={() => {
            goToScreen("Yoga");
          }}
          title={"Yoga"}
          // subTitle={"List of doctors near you"}
          showImg={true}
          imageSource={Assets.yoga}
        />
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardSubTitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 10,
  },
});
