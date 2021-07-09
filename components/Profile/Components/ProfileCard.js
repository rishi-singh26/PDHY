import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { primaryColor } from "../../../shared/Colors";
import { SCREEN_WIDTH } from "../../../shared/Styles";

export default function ProfileCard() {
  return (
    <View
      style={{
        height: SCREEN_WIDTH,
        height: SCREEN_WIDTH - SCREEN_WIDTH / 3,
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          height: "70%",
          width: "100%",
          backgroundColor: primaryColor,
          borderRadius: 10,
          alignItems: "center",
          //   justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "700",
            marginTop: 20,
          }}
        >
          Rishi Singh
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "700",
            marginTop: 15,
          }}
        >
          rishisingh@gmail.com
        </Text>
      </View>
      <Image
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
        }}
        style={{
          height: "55%",
          width: "40%",
          position: "absolute",
          bottom: 9,
          alignSelf: "center",
          zIndex: 1000,
          borderRadius: 100,
        }}
      />
    </View>
  );
}
