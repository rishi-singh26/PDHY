import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { logoutUser } from "../../Redux/Auth/ActionCreator";
import { useSelector, useDispatch } from "react-redux";
import { auth, firestore } from "../../Constants/Apis";
import { Avatar } from "react-native-elements";
import { primaryColor, primaryErrColor } from "../../shared/Colors";
import { Feather } from "@expo/vector-icons";
import ListItem from "./Components/ListItem";
import { showAlert } from "../../Redux/Alert/ActionCreator";
import {
  hideFloatingBtn,
  showFloatingBtn,
} from "../../Redux/ShowFloatingGoToCartBtn/ActionCreator";

export default function Profile(props) {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigateToEdit = () => {
    props.navigation.navigate("EditProfile");
  };

  const createOneData = () => {
    firestore
      .collection("doctorCalanders")
      .doc(auth.currentUser.uid)
      .collection("01-2021")
      .add({
        date: "1 Jan, 2020",
        dateNum: "1",
        timeSlot: "09:00 AM",
      })
      .then((resp) => {
        console.log("Data posted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logout = () => {
    dispatch(
      showAlert(
        `Do you want to logout?`,
        `You will have to login again to use our services.`,
        () => dispatch(logoutUser())
      )
    );
  };

  useEffect(() => {
    dispatch(hideFloatingBtn());
    return () => {
      dispatch(showFloatingBtn());
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.headerCard}>
          <View>
            {authData?.user?.fullName ? (
              <Text style={styles.displayNameTxt}>
                {authData.user.fullName}
              </Text>
            ) : (
              <Text
                onPress={navigateToEdit}
                style={[styles.displayNameTxt, { color: primaryColor }]}
              >
                Update profile
              </Text>
            )}
            <Text style={styles.emailTxt}>
              {auth?.currentUser?.email || "Display name"}
            </Text>
          </View>
          {auth?.currentUser?.photoURL ? (
            <Avatar
              rounded
              source={{ uri: auth.currentUser.photoURL }}
              size={60}
              onPress={() => console.log("jhjh")}
            />
          ) : (
            <TouchableOpacity
              onPress={navigateToEdit}
              style={styles.imageEditIconStyle}
            >
              <Feather name="edit-2" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <ListItem
          title={"My Orders"}
          style={{ marginTop: 8 }}
          leftIcon="package"
          rightIcon="chevron-right"
          onPress={() => {
            props.navigation.navigate("MyOrders");
          }}
        />
        <ListItem
          title={"My Appointments"}
          leftIcon="book"
          rightIcon="chevron-right"
          onPress={() => {
            props.navigation.navigate("MyAppointments");
          }}
        />
        <ListItem
          title={"Add doctor"}
          style={{ marginTop: 8 }}
          leftIcon="plus"
          rightIcon="chevron-right"
          onPress={() => {
            props.navigation.navigate("Adddoctor");
          }}
        />
        <ListItem
          title={"Add pharmacy"}
          leftIcon="plus"
          rightIcon="chevron-right"
          onPress={() => {
            props.navigation.navigate("Addpharmacy");
          }}
        />
        <ListItem
          title={"Doctor Applications"}
          style={{ marginTop: 8 }}
          leftIcon="file-text"
          rightIcon="chevron-right"
          onPress={() => {
            props.navigation.navigate("DocApplications");
          }}
        />
        <ListItem
          title={"Pharmacy applications"}
          leftIcon="file-text"
          rightIcon="chevron-right"
          onPress={() => {
            props.navigation.navigate("PharmacyApplications");
          }}
        />
        <ListItem
          title={"Log out"}
          leftIconColor={primaryErrColor}
          style={{ marginTop: 8 }}
          leftIcon="log-out"
          rightIcon="chevron-right"
          onPress={() => {
            logout();
          }}
          titleColor={primaryErrColor}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginTop: 10,
  },
  displayNameTxt: {
    fontSize: 22,
    fontWeight: "700",
  },
  emailTxt: {
    fontSize: 17,
    fontWeight: "700",
    color: "#777",
    marginTop: 10,
  },
  imageEditIconStyle: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 40,
  },
});
