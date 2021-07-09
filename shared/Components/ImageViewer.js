import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "../Styles";

export default function ImageViewer(props) {
  const { imgData, removeImage } = props.route.params;
  // console.log(imgData.image);

  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePinch = Animated.event([{ nativeEvent: { scale } }]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 25 }}>
      <View style={styles.topBackBtnView}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={[styles.topBackBtn, { backgroundColor: "#dfdfdf" }]}
        >
          <Feather name={"chevron-down"} size={25} color={"#222"} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {/* image here */}

        <PinchGestureHandler onGestureEvent={handlePinch}>
          <Animated.Image
            source={{ uri: imgData.image }}
            style={[styles.image, { transform: [{ scale }] }]}
          />
        </PinchGestureHandler>
        <Text style={{ fontSize: 20, color: "#222", marginHorizontal: 15 }}>
          {imgData.imageName}
        </Text>

        {removeImage ? (
          <TouchableOpacity
            onPress={() => {
              removeImage ? removeImage() : null;
              props.navigation.goBack();
            }}
            style={[styles.removeImageBtn, { backgroundColor: "#dfdfdf" }]}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#222" }}>
              Remove Image
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBackBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  topBackBtn: {
    padding: 14,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_WIDTH - 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  removeImageBtn: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
