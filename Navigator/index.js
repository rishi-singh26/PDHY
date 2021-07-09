import React, { useRef, useEffect } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import * as firebase from "firebase";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
// import * as Updates from "expo-updates";
// import Dilogue from "../components/Modal";
import Doctors from "../components/Doctor/index";
import Pharmacy from "../components/Pharmacy/index";
import DoctorSearch from "../components/Doctor/Components/DoctorSearch";
import Pharmacysearch from "../components/Pharmacy/Components/PharmacySearch";
import Doctordetail from "../components/Doctor/Components/DoctorDetail";
import Pharmacydetail from "../components/Pharmacy/Components/PharmacyDetail";
import Home from "../components/Home/index";
import Cart from "../components/Cart/index";
import Adddoctor from "../components/Doctor/Components/AddDoctor";
import Addpharmacy from "../components/Pharmacy/Components/AddPharmacy";
import HomeRemedies from "../components/HomeRemedies/index";
import About from "../components/About/index";
import Profile from "../components/Profile/index";
import AddAddress from "../components/AddAddress/index";
import CustomAddress from "../components/AddAddress/CustomAddress";
import Addresses from "../components/Addresses/index";
import Yoga from "../components/Yoga/index";
import MyOrders from "../components/MyOrders/index";
import MyAppointments from "../components/MyAppointments/index";
import Appointment from "../components/Doctor/Components/Appointments";
import Authentication from "../components/Authentication/index";
import EditProfile from "../components/Profile/Components/EditProfile";
import VideoPlayer from "../components/VideoPlayer/index";
import DocApplications from "../components/DocApplications/index";
import PharmacyApplications from "../components/PharApplications/index";
import YogaList from "../components/Yoga/Components/YogaList";
import ImageViewer from "../shared/Components/ImageViewer";

import { Feather } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../shared/Styles";
import { logoutUser } from "../Redux/Auth/ActionCreator";
import CustomAlert from "../shared/Components/CustomAlert";
import ThreeBtnAlert from "../shared/Components/ThreeBtnAlert";
import { Snackbar } from "react-native-paper";
import { hideSnack } from "../Redux/Snack/ActionCreator";

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default function Navigator(props) {
  // global state
  const cart = useSelector((state) => state.cart);
  const shouldShow = useSelector((state) => state.shouldShow);
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);
  const snack = useSelector((state) => state.snack);

  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    user ? null : dispatch(logoutUser());
  };

  const navigationRef = useRef(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(onAuthStateChanged);
  // }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#fff"
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: { fontWeight: "700", fontSize: 22 },
        }}
      >
        {auth.isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pharmacy"
              component={Pharmacy}
              options={{ title: "Pharmacies" }}
            />
            <Stack.Screen name="Pharmacydetail" component={Pharmacydetail} />
            <Stack.Screen
              name="Pharmacysearch"
              component={Pharmacysearch}
              options={{ title: "Pharmacy search" }}
            />
            <Stack.Screen
              name="Addpharmacy"
              component={Addpharmacy}
              options={{ title: "Add pharmacy" }}
            />
            <Stack.Screen
              name="Doctor"
              component={Doctors}
              options={{ title: "Doctors" }}
            />
            <Stack.Screen
              name="Doctordetail"
              component={Doctordetail}
              options={{ title: "About doctor" }}
            />
            <Stack.Screen
              name="DoctorSearch"
              component={DoctorSearch}
              options={{ title: "Doctors search" }}
            />
            <Stack.Screen
              name="Adddoctor"
              component={Adddoctor}
              options={{ title: "Add doctor" }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ title: "Cart" }}
            />
            <Stack.Screen
              name="HomeRemedies"
              component={HomeRemedies}
              options={{ title: "Home Remedies" }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Profile" }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ title: "Edit profile" }}
            />
            <Stack.Screen
              name="Addresses"
              component={Addresses}
              options={{ title: "Select Address" }}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddAddress}
              options={{ title: "Add address" }}
            />
            <Stack.Screen
              name="CustomAddress"
              component={CustomAddress}
              options={{ title: "Add address" }}
            />
            <Stack.Screen
              name="Yoga"
              component={Yoga}
              options={{ title: "Yoga" }}
            />
            <Stack.Screen
              name="MyOrders"
              component={MyOrders}
              options={{ title: "My Orders" }}
            />
            <Stack.Screen
              name="MyAppointments"
              component={MyAppointments}
              options={{ title: "My Appointments" }}
            />
            <Stack.Screen
              name="Appointment"
              component={Appointment}
              options={{ title: "Appointment visit" }}
            />
            <Stack.Screen
              name="VideoPlayer"
              component={VideoPlayer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DocApplications"
              component={DocApplications}
              options={{ title: "Doctor application" }}
            />
            <Stack.Screen
              name="PharmacyApplications"
              component={PharmacyApplications}
              options={{ title: "Pharmacy applications" }}
            />
            <Stack.Screen name="YogaList" component={YogaList} />
            <Stack.Screen
              name="ImageViewer"
              component={ImageViewer}
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Authentication"
              component={Authentication}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      {cart.products.length > 0 && shouldShow && auth.isAuthenticated ? (
        <View style={styles.floatingBtn}>
          {/* <TouchableOpacity
            style={styles.closeFloatingBtn}
            onPress={() => dispatch(hideFloatingBtn())}
          >
            <Feather name="x" color="#fff" size={17} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              navigationRef.current?.navigate("Cart");
            }}
            style={styles.goToCartTouchableView}
          >
            <Text style={styles.goToCartTxt}>Go to cart</Text>
            <Feather name="arrow-right" color="#fff" size={23} />
          </TouchableOpacity>
        </View>
      ) : null}
      <Snackbar
        visible={snack.isVisible}
        onDismiss={() => dispatch(hideSnack())}
        action={
          snack.actionTxt
            ? {
                label: snack.actionTxt,
                onPress: () => {
                  snack.actionFunc();
                  dispatch(hideSnack());
                },
              }
            : null
        }
      >
        {snack.message}
      </Snackbar>
      <CustomAlert isVisible={alert.isVisible} />
      <ThreeBtnAlert isVisible={alert.is3BtnAlertVisible} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#3b73ff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 220,
    paddingHorizontal: 20,
    paddingVertical: 7,
    alignItems: "center",
    shadowColor: "#3b73ff",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  closeFloatingBtn: {
    padding: 5,
    backgroundColor: "#7aa0ff",
    borderRadius: 20,
  },
  goToCartTouchableView: {
    flex: 7,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goToCartTxt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },
});
