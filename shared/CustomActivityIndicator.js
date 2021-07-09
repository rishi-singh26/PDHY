import React from "react";
import { ActivityIndicator } from "react-native";
import { primaryColor } from "./Colors";

export default function CustomActivityIndicator() {
  return (
    <ActivityIndicator
      color={primaryColor}
      style={{
        position: "absolute",
        zIndex: 1000,
        marginTop: 200,
        alignSelf: "center",
      }}
      size={35}
    />
  );
}
