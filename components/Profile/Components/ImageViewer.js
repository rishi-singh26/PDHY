import { Feather } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, Image, View, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../../shared/Styles";

export default function ImageViewer(props) {
  const { imgSrc } = props.route.params;
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "flex-start" }}>
      {/* <Feather
        name="x"
        onPress={() => props.navigation.goBack()}
        size={25}
        style={{ padding: 20 }}
      /> */}
      <Image source={imgSrc} style={styles.image}></Image>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    aspectRatio: 1,
  },
});
