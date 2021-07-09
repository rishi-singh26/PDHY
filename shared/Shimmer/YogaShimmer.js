import React from "react";
import { View, Text, ScrollView } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { SCREEN_WIDTH } from "../Styles";

const shimmerColors = ["#fff", "#f00"];

export default function YogaShimmer({ numbers }) {
  return (
    <ScrollView>
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
              marginTop: 8,
            }}
          >
            <View>
              <ShimmerPlaceHolder
                autoRun={true}
                height={200}
                width={SCREEN_WIDTH - 30}
                colorShimmer={shimmerColors}
              />
              <Text style={{ height: 10 }}></Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <ShimmerPlaceHolder
                    autoRun={true}
                    height={15}
                    width={SCREEN_WIDTH - 90}
                    colorShimmer={shimmerColors}
                  />
                  <Text style={{ height: 5 }}></Text>
                  <ShimmerPlaceHolder
                    autoRun={true}
                    height={10}
                    width={SCREEN_WIDTH - 160}
                    colorShimmer={shimmerColors}
                  />
                </View>
                <View>
                  <ShimmerPlaceHolder
                    autoRun={true}
                    height={25}
                    width={20}
                    colorShimmer={shimmerColors}
                  />
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
