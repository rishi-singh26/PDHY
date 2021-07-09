import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from "react-native";

export default function RenderCard({
  onPress,
  title,
  subTitle,
  imageSource,
  showImg,
}) {
  return (
    // <TouchableNativeFeedback
    //   onPress={() => {
    //     onPress();
    //   }}
    // >
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        onPress();
      }}
    >
      {showImg ? (
        <Image source={imageSource} style={styles.imageStyle}></Image>
      ) : null}
      <View style={styles.cartTxtView}>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          {subTitle && <Text style={styles.cardSubTitle}>{subTitle}</Text>}
        </View>
        <Feather name="chevron-right" color="#888" size={23} />
      </View>
    </TouchableOpacity>
    // </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageStyle: { height: 150, width: 340, marginBottom: 20 },
  cartTxtView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
