import React from "react";
import { SafeAreaView, View } from "react-native";
import { Video } from "expo-av";
import { SCREEN_WIDTH } from "../../shared/Styles";

export default function VideoPlayer() {
  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <Video
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="contain"
          shouldPlay
          isLooping
          style={{ width: SCREEN_WIDTH, height: 300 }}
          useNativeControls={true}
        />
      </View>
    </SafeAreaView>
  );
}
