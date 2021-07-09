import React from "react";
import { View, Text } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const shimmerColors = ["#fff", "#f00"];

export default function PharmacyNdDocShimmer({ numbers }) {
  return numbers.map((it, ind) => {
    return (
      <View
        key={ind}
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderTopColor: "#efefef",
          borderTopWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <View>
          <ShimmerPlaceHolder
            autoRun={true}
            height={20}
            width={200}
            colorShimmer={shimmerColors}
          />
          <Text style={{ height: 10 }}></Text>
          <ShimmerPlaceHolder
            autoRun={true}
            height={10}
            width={250}
            colorShimmer={shimmerColors}
          />
          <Text style={{ height: 10 }}></Text>
          <ShimmerPlaceHolder
            autoRun={true}
            height={10}
            width={250}
            colorShimmer={shimmerColors}
          />
          <Text style={{ height: 3 }}></Text>
          <ShimmerPlaceHolder
            autoRun={true}
            height={10}
            width={250}
            colorShimmer={shimmerColors}
          />
        </View>

        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#f2f2f2",
            marginHorizontal: 20,
          }}
        ></View>
      </View>
    );
  });
}
