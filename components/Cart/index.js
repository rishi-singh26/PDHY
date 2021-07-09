import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCartTotalPrice,
  GetWhatsappTextFromCart,
} from "../../shared/Functions";
import { SCREEN_WIDTH } from "../../shared/Styles";
import {
  deleteProductFromCart,
  increaseProductCount,
  decreaseProductCount,
  clearCart,
} from "../../Redux/Cart/ActionCreator";
import {
  showFloatingBtn,
  hideFloatingBtn,
} from "../../Redux/ShowFloatingGoToCartBtn/ActionCreator";
import { Feather, Ionicons } from "@expo/vector-icons";
import { showAlert } from "../../Redux/Alert/ActionCreator";
import CartTotalBreakDown from "./Components/CartTotalBreakDown";
import { auth } from "../../Constants/Apis";

export default function Cart(props) {
  // global state
  const cart = useSelector((state) => state.cart);
  // action dispatcher
  const dispatch = useDispatch();
  // local state
  const [isCartTotalBrekdownShown, setIsCartTotalBrekdownShown] =
    useState(false);

  const clearCartFunc = () => {
    dispatch(
      showAlert(
        `Do you want to clear your cart?`,
        `This will remove all products from your cart.`,
        () => {
          dispatch(clearCart());
          props.navigation.goBack();
        }
      )
    );
  };

  const placeOrder = () => {
    const WHATSAPP_STRING = GetWhatsappTextFromCart(
      cart.products,
      auth.currentUser.displayName,
      "My complete address",
      "Pharmacy name"
    );
    console.log(WHATSAPP_STRING);
    const phonNum =
      cart.contactNo[0] === "+" ? cart.contactNo : `+91${cart.contactNo}`;
    let url = "whatsapp://send?text=" + WHATSAPP_STRING + "&phone=" + phonNum;
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
    dispatch(clearCart());
  };

  const placeOrderAlert = () => {
    dispatch(
      showAlert(
        "You are placing an order",
        "This action will clear your cart, do you want to proceed?",
        placeOrder
      )
    );
  };

  useEffect(() => {
    props.navigation.setOptions({
      title:
        cart.products.length > 0
          ? `Cart (${cart.products.length} Products)`
          : `Cart`,
      headerRight: () => {
        return cart.products.length > 0 ? (
          <Text
            onPress={() => clearCartFunc()}
            style={{ marginRight: 20, fontWeight: "700" }}
          >
            CLEAR CART
          </Text>
        ) : null;
      },
    });
    dispatch(hideFloatingBtn());
    return () => dispatch(showFloatingBtn());
  }, [cart]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {cart.products.length > 0 ? (
        <>
          <FlatList
            data={cart.products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.productDetailView}>
                  <View style={{ flex: 6 }}>
                    <Text style={{ fontSize: 17, fontWeight: "700" }}>
                      {item.medicineName}
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: 10 }}>
                      {item.priceOfTenTabs} * {item.productCountInCart} = ₹{" "}
                      {item.priceOfTenTabs * item.productCountInCart}
                    </Text>
                  </View>
                  <View style={styles.productDetailRightView}>
                    <View style={styles.plusMinusBtnView}>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 7 }}
                        onPress={() => {
                          dispatch(decreaseProductCount(index));
                        }}
                      >
                        <Text style={{ color: "green", fontSize: 17 }}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{ paddingHorizontal: 7, paddingVertical: 7 }}
                      >
                        {item.productCountInCart}
                      </Text>
                      <TouchableOpacity
                        style={{ paddingHorizontal: 10, paddingVertical: 7 }}
                        onPress={() => {
                          dispatch(increaseProductCount(index));
                        }}
                      >
                        <Text style={{ color: "green", fontSize: 17 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(deleteProductFromCart(index));
                        cart.products.length === 1
                          ? props.navigation.goBack()
                          : null;
                      }}
                    >
                      <Ionicons
                        name="ios-trash-outline"
                        color="#ff8c8c"
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
          <View style={{ backgroundColor: "#fff" }}>
            <Text style={styles.prescriptionNote}>
              NOTE : Upload a picture of your prescription through the chat
              portal after placing your order. If you do not upload your
              prescription within 10 minutes of placing the order, your order
              will be cancelled!!
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.bottomBtn, { backgroundColor: "#fff" }]}
              // onPress={() => setIsCartTotalBrekdownShown(true)}
            >
              <Text style={{ fontSize: 17, color: "#000", fontWeight: "700" }}>
                Cart Total
              </Text>
              <Text style={{ fontSize: 14, color: "#000" }}>
                ₹ {GetCartTotalPrice(cart.products)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bottomBtn, { backgroundColor: "#3b73ff" }]}
              onPress={placeOrderAlert}
            >
              <Text style={{ fontSize: 17, color: "#fff", fontWeight: "700" }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 23, fontWeight: "700", color: "#777" }}>
            CART EMPTY
          </Text>
        </View>
      )}
      <CartTotalBreakDown
        closeDilogue={() => setIsCartTotalBrekdownShown(false)}
        isVisible={isCartTotalBrekdownShown}
      ></CartTotalBreakDown>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  prescriptionNote: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff8c8c",
    margin: 15,
  },
  bottomBtn: {
    width: SCREEN_WIDTH / 2,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
  },
  plusMinusBtnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 20,
    borderColor: "green",
    borderWidth: 1,
    alignItems: "center",
  },
  productDetailView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productDetailRightView: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
