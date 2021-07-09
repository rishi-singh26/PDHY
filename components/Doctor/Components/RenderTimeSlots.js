import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import { primaryColor } from "../../../shared/Colors";

export default function RenderTimeSlots({
  onSlotPress,
  selectedIndex,
  timeSlots,
}) {
  return (
    <View
      style={{
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 21, fontWeight: "700", paddingVertical: 10 }}>
        {timeSlots.length > 0 ? "Available slots" : "No slots available"}
      </Text>
      {timeSlots.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={timeSlots}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <>
                {/* {item.isAvailable && !item.isBooked ? ( */}
                <TouchableOpacity
                  onPress={() => onSlotPress(index)}
                  style={{
                    padding: 15,
                    margin: 15,
                    borderRadius: 12,
                    backgroundColor:
                      index === selectedIndex ? primaryColor : "#bbb",
                  }}
                >
                  <Text
                    style={{ fontSize: 17, fontWeight: "700", color: "#fff" }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
                {/* ) : null} */}
              </>
            );
          }}
        />
      ) : null}
    </View>
  );
}
