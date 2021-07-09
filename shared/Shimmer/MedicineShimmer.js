import React from "react";
import { View, Text } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const shimmerColors = ["#fff", "#f00"];

export default function MedicineShimmer({ numbers }) {
  return (
    <View>
      <ShimmerPlaceHolder
        style={{ marginHorizontal: 15, marginTop: 20 }}
        autoRun={true}
        height={15}
        width={200}
        colorShimmer={shimmerColors}
      />
      <ShimmerPlaceHolder
        style={{ marginHorizontal: 15, marginTop: 4 }}
        autoRun={true}
        height={15}
        width={170}
        colorShimmer={shimmerColors}
      />
      <ShimmerPlaceHolder
        style={{ marginHorizontal: 15, marginTop: 15 }}
        autoRun={true}
        height={12}
        width={140}
        colorShimmer={shimmerColors}
      />
      <ShimmerPlaceHolder
        style={{ marginHorizontal: 15, marginTop: 15 }}
        autoRun={true}
        height={12}
        width={140}
        colorShimmer={shimmerColors}
      />
      <ShimmerPlaceHolder
        style={{ marginHorizontal: 15, marginTop: 20 }}
        autoRun={true}
        height={25}
        width={140}
        colorShimmer={shimmerColors}
      />
      {numbers.map((it, ind) => {
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
      })}
    </View>
  );
}
