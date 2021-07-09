import React from "react";
import { View, Text } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const shimmerColors = ["#fff", "#f00"];

export default function AddressShimmer({ numbers }) {
  return numbers.map((it, ind) => {
    return (
      <View
        key={ind}
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderTopColor: "#efefef",
          borderTopWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#f2f2f2",
          }}
        ></View>
        <View>
          <ShimmerPlaceHolder
            autoRun={true}
            height={20}
            width={250}
            colorShimmer={shimmerColors}
          />
          <Text style={{ height: 10 }}></Text>
          <ShimmerPlaceHolder
            autoRun={true}
            height={10}
            width={300}
            colorShimmer={shimmerColors}
          />
          <Text style={{ height: 3 }}></Text>
          <ShimmerPlaceHolder
            autoRun={true}
            height={10}
            width={300}
            colorShimmer={shimmerColors}
          />
        </View>
        <View
          style={{
            width: 10,
            height: 30,
            borderRadius: 5,
            backgroundColor: "#f2f2f2",
          }}
        ></View>
      </View>
    );
  });
}
