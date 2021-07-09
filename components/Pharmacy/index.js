import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "../../shared/Styles";
import { Avatar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import PharmacyNdDocShimmer from "../../shared/Shimmer/PharmacyAndDocShimmer";
import { getPharmacies } from "../../Redux/Pharmacies/ActionCreator";
import { primaryColor } from "../../shared/Colors";
import { getCityIdFromNameForPharmaciew } from "../../shared/Functions";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function Pharmacy(props) {
  // route params
  const { userLocationData } = props.route.params;
  // console.log("Here is user location data on DOCTORS", userLocationData);
  // global state
  const pharmacies = useSelector((state) => state.pharmacies);
  // local state
  const [city, setCity] = useState(userLocationData.county);
  const [language, setLanguage] = useState("English");
  const [refreshing, setRefreshing] = useState(false);
  // action dispatcher
  const dispatch = useDispatch();

  const renderPharmacy = (pharmacy, contactNumber, location) => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[primaryColor, "#fff"]}
            refreshing={refreshing}
            onRefresh={() =>
              dispatch(
                getPharmacies(
                  getCityIdFromNameForPharmaciew(userLocationData.county)
                )
              )
            }
          />
        }
        data={pharmacy}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Pharmacydetail", { object: item });
              }}
              style={[
                styles.renderCard,
                { marginBottom: pharmacy.length - 1 === index ? 100 : 0 },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 6 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      minHeight: 50,
                    }}
                  >
                    {item.pharmacyName}
                  </Text>
                  <Text style={{ fontSize: 14 }}>
                    {contactNumber} : {item.contact}
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    {location} : {item.pharmacyLocation}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Avatar
                    rounded
                    size="medium"
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const setHeaderOptions = () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                props.navigation.navigate("Pharmacysearch", {
                  object: pharmacies.data,
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

  useEffect(() => {
    setHeaderOptions();
    dispatch(
      getPharmacies(getCityIdFromNameForPharmaciew(userLocationData.county))
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        {pharmacies.isLoading ? (
          <PharmacyNdDocShimmer numbers={[1, 2, 3, 4, 5, 6, 7]} />
        ) : language == "English" ? (
          renderPharmacy(pharmacies.data, "Contact", "Location")
        ) : (
          renderPharmacy(pharmacies.data, "ಸಂಪರ್ಕಿಸಿ", "ಸ್ಥಳ")
        )}
      </View>
    </SafeAreaView>
  );
}
