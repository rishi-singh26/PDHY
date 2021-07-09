import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import styles from "../../shared/Styles";
import { Avatar } from "react-native-elements";
import {
  showFloatingBtn,
  hideFloatingBtn,
} from "../../Redux/ShowFloatingGoToCartBtn/ActionCreator";
import { useDispatch, useSelector } from "react-redux";
import PharmacyNdDocShimmer from "../../shared/Shimmer/PharmacyAndDocShimmer";
import { getDoctors } from "../../Redux/Doctors/ActionCreator";
import { getCityIdFromName } from "../../shared/Functions";
import { primaryColor } from "../../shared/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function Doctors(props) {
  // route params
  const { userLocationData } = props.route.params;
  // console.log("Here is user location data on DOCTORS", userLocationData);
  // global state
  const doctors = useSelector((state) => state.doctors);
  // local state
  const [city, setCity] = useState(userLocationData.county);
  const [language, setLanguage] = useState("English");
  const [refreshing, setRefreshing] = useState(false);
  // action dispatcher
  const dispatch = useDispatch();

  const setHeaderOptions = () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                props.navigation.navigate("DoctorSearch", {
                  object: doctors.data,
                  city: city,
                });
              }}
            >
              <Feather name="search" size={23} color="black" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                props.navigation.navigate("Addresses");
              }}
            >
              <MaterialIcons name="my-location" size={23} color="black" />
            </TouchableOpacity> */}
          </View>
        );
      },
    });
  };

  const renderDoctors = (doctors, specilistIn, location) => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[primaryColor, "#fff"]}
            refreshing={refreshing}
            onRefresh={() =>
              dispatch(getDoctors(getCityIdFromName(userLocationData.county)))
            }
          />
        }
        data={doctors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item.name + "Pressed");
                props.navigation.navigate("Doctordetail", {
                  object: item,
                });
              }}
              style={[styles.renderCard, localStyles.doctorCard]}
            >
              <View style={{ flex: 5 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                  }}
                >
                  {item.name}
                </Text>

                <Text style={{ fontSize: 14, color: "#888" }}>
                  {/* {specilistIn} :  */}
                  {item.type}
                </Text>
                <Text style={{ fontSize: 14, color: "#888", marginTop: 5 }}>
                  {location} : {item.location}
                </Text>
              </View>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: item.Image,
                }}
                containerStyle={{ marginHorizontal: 15 }}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  useEffect(() => {
    dispatch(hideFloatingBtn());
    setHeaderOptions();
    dispatch(getDoctors(getCityIdFromName(userLocationData.county)));
    return () => {
      dispatch(showFloatingBtn());
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        {doctors.isLoading ? (
          <PharmacyNdDocShimmer numbers={[1, 2, 3, 4, 5, 6, 7]} />
        ) : language == "English" ? (
          renderDoctors(doctors.data, "Specilist in", "Location")
        ) : (
          renderDoctors(doctors.data, "ಸ್ಪೆಷಲಿಸ್ಟ್ ಇನ್", "ಸ್ಥಳ")
        )}
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  doctorCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
