import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import styles from "../../../shared/Styles";
import { Badge } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToCart,
  increaseProductCount,
  decreaseProductCount,
  clearCart,
} from "../../../Redux/Cart/ActionCreator";
import { primaryColor } from "../../../shared/Colors";
import pharmacy from "../../../shared/Pharmacy";
import { showAlert } from "../../../Redux/Alert/ActionCreator";
import { auth, firestore } from "../../../Constants/Apis";
import { showSnack } from "../../../Redux/Snack/ActionCreator";
import MedicineShimmer from "../../../shared/Shimmer/MedicineShimmer";

export default function Pharmacydetail(props) {
  // global state
  const cart = useSelector((state) => state.cart);
  // local state
  const [medicinesList, setMedicineList] = useState([]);
  const [isMedicinesLoading, setIsMedicinesLoading] = useState(true);

  const { object: pharmacyObject } = props.route.params;
  // console.log("Here is it", pharmacyObject);

  const [medicineSearchKey, setMedicineSearchKey] = useState("");
  const [language, setLanguage] = useState("English");
  const [showSearchBar, setShowSearchBar] = useState(false);
  // action dispatcher
  const dispatch = useDispatch();

  const setHeaderOptions = () => {
    const { pharmacyName } = pharmacyObject;
    props.navigation.setOptions({
      title: pharmacyName,
      headerRight: () => {
        return (
          <View style={[styles.navBar, { marginRight: 10 }]}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => {
                setShowSearchBar(true);
              }}
            >
              <Feather name="search" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => {
                props.navigation.navigate("Cart");
              }}
            >
              <Feather name="shopping-cart" size={20} color="#000" />
              <Badge
                status="success"
                containerStyle={{ position: "absolute", top: -7, right: -7 }}
                value={cart.products.length}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  };

  const addNewProductToCart = (product, pharmacyId, pharmacyContactNo) => {
    const productToBeAdded = JSON.parse(JSON.stringify(product));
    productToBeAdded.productCountInCart = 1;

    cart.products.length === 0
      ? dispatch(
          addProductToCart(productToBeAdded, pharmacyId, pharmacyContactNo)
        )
      : pharmacyId === cart.pharmacyId
      ? dispatch(
          addProductToCart(productToBeAdded, pharmacyId, pharmacyContactNo)
        )
      : dispatch(
          showAlert(
            `Do you want to replace cart item?`,
            `This will remove all products from cart and add the selected product.`,
            () => {
              dispatch(clearCart());
              dispatch(
                addProductToCart(
                  productToBeAdded,
                  pharmacyId,
                  pharmacyContactNo
                )
              );
            }
          )
        );
  };

  const renderMedicines = (
    PharmacyLocation,
    established,
    openTill,
    medicines
  ) => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 60 }}
        data={medicinesList}
        keyExtractor={(item, index) => index.toString()}
        refreshing={isMedicinesLoading}
        ListHeaderComponent={() => {
          return (
            <View style={localStyles.pharmacyDetailCard}>
              <View style={{ flex: 3 }}>
                <Text style={styles.detail}>
                  {PharmacyLocation}:{" "}
                  <Text style={{ fontWeight: "700" }}>
                    {pharmacyObject.pharmacyLocation}
                  </Text>
                </Text>
                <Text style={styles.detail}>
                  {established}:{" "}
                  <Text style={{ fontWeight: "700" }}>
                    {pharmacyObject.established}
                  </Text>
                </Text>
                <Text style={styles.detail}>
                  {openTill}:{" "}
                  <Text style={{ fontWeight: "700" }}>
                    {pharmacyObject.openTill}
                  </Text>
                </Text>
                <Text style={{ fontSize: 22, margin: 13, fontWeight: "bold" }}>
                  {medicines}:
                </Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 60 }}>
                <TouchableOpacity
                  onPress={dialCall}
                  style={localStyles.callBtn}
                >
                  <Fontisto name="phone" size={25} color={"green"} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          const indexOfProductInCart = cart.products.findIndex(
            (x) =>
              item._id === x._id &&
              item.medicineName === x.medicineName &&
              pharmacyObject._id === cart.pharmacyId
          );
          return (
            <View
              key={index}
              style={[
                styles.renderMedicineCards,
                { marginBottom: index === medicinesList - 1 ? 100 : 10 },
              ]}
            >
              <View style={{ flex: 5 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", minHeight: 50 }}
                >
                  {item.medicineName}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  Concentration: {item.concentration}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  Price: ₹{item.priceOfTenTabs}
                </Text>
              </View>
              {indexOfProductInCart === -1 ? (
                <TouchableOpacity
                  onPress={() => {
                    addNewProductToCart(
                      item,
                      pharmacyObject._id,
                      pharmacyObject.contact
                    );
                  }}
                  style={localStyles.addProductToCartBtn}
                >
                  <Text style={localStyles.addBtnTxt}>ADD</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.plusMinusButton}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(decreaseProductCount(indexOfProductInCart));
                    }}
                  >
                    <Text style={localStyles.plusMinusBtnTxt}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ paddingHorizontal: 7 }}>
                    {cart.products[indexOfProductInCart].productCountInCart}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(increaseProductCount(indexOfProductInCart));
                    }}
                  >
                    <Text style={localStyles.plusMinusBtnTxt}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    );
  };

  const searchMedicine = (searchKey) => {
    const medicines = [...medicinesList];
    if (searchKey.length > 0) {
      var searchDataArr = [];

      for (var i = 0; i < medicines.length; i++) {
        if (
          medicines[i].medicineName
            .toUpperCase()
            .includes(searchKey.toUpperCase())
        ) {
          searchDataArr.push(medicines[i]);
        } else {
          // console.log("Not Found");
        }
      }
      setMedicineList(searchDataArr);
    } else {
      setMedicineList(pharmacy[0].pharmacyList[0].medicineList);
      return null;
    }
  };

  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:" + pharmacyObject.contact;
    } else {
      phoneNumber = "telprompt:" + pharmacyObject.contact;
    }

    Linking.openURL(phoneNumber);
  };

  const getMedicines = () => {
    if (!auth.currentUser) {
      dispatch(showSnack(`Authentication errror, logout and login again`));
      setIsMedicinesLoading(false);
      return;
    }

    firestore
      .collection("medicines")
      .where("pharmacyId", "==", pharmacyObject._id)
      .get()
      .then((medicines) => {
        let medicinesArr = [];
        medicines.forEach((medicine) => {
          const data = medicine.data();
          const _id = medicine.id;
          medicinesArr.push({ ...data, _id });
        });
        console.log(medicinesArr.length);
        setMedicineList(medicinesArr);
        setIsMedicinesLoading(false);
      })
      .catch((err) => {
        dispatch(showSnack(`Error in getting medicines ${err.message}`));
        setIsMedicinesLoading(false);
        console.log(`Error in getting medicines ${err.message}`);
      });
  };

  useEffect(() => {
    setHeaderOptions();
  }, [cart]);

  useEffect(() => {
    getMedicines();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showSearchBar ? (
        <View style={localStyles.medicineSearchView}>
          <TouchableOpacity style={localStyles.closeSearchBarBtn}>
            <Feather
              name="x"
              size={22}
              color="#777"
              onPress={() => {
                setShowSearchBar(false);
                getMedicines();
                setMedicineSearchKey("");
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={localStyles.medicineSearchInput}
            placeholder="Search"
            value={medicineSearchKey}
            onChangeText={(text) => setMedicineSearchKey(text)}
            returnKeyType="search"
            onSubmitEditing={(e) => searchMedicine(e.nativeEvent.text)}
          />
        </View>
      ) : null}
      {isMedicinesLoading ? (
        <MedicineShimmer numbers={[1, 2, 3, 4, 5, 6]} />
      ) : language === "Kannada" ? (
        renderMedicines("ಸ್ಥಳ", "ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಗಿದೆ", "ತನಕ ತೆರೆಯಿರಿ", "ಔಷಧ")
      ) : (
        renderMedicines("Address", "Established in", "Open till", "Medicines")
      )}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  medicineSearchView: {
    backgroundColor: "#fff",
    elevation: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  closeSearchBarBtn: {
    marginHorizontal: 7,
    backgroundColor: "#f2f2f2",
    padding: 5,
    borderRadius: 15,
  },
  medicineSearchInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: primaryColor,
    paddingHorizontal: 3,
    fontSize: 19,
  },
  pharmacyDetailCard: {
    backgroundColor: "#f2f2f2",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  addProductToCartBtn: {
    borderColor: "green",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addBtnTxt: {
    fontWeight: "700",
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  plusMinusBtnTxt: {
    fontSize: 22,
    color: "green",
    paddingHorizontal: 7,
  },
  callBtn: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20,
    paddingLeft: 25,
  },
});
