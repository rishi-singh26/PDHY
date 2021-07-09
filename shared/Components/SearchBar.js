import React from "react";
import { View, TextInput } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function SearchBar({
  onTextChange,
  searchKey,
  onXPress,
  onSubmitEditing,
}) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomColor: "#dfdfdf",
        borderBottomWidth: 0.8,
        elevation: 0.2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#efefef",
          paddingLeft: 20,
          paddingRight: 0,
          borderRadius: 8,
        }}
      >
        <TextInput
          value={searchKey}
          onChangeText={(text) => onTextChange(text)}
          placeholder={"Search here"}
          placeholderTextColor={"#888"}
          style={{
            fontSize: 17,
            flex: 1,
            color: "#222",
            paddingVertical: 8,
          }}
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
        />
        {searchKey.length > 0 && (
          //   <Feather
          //     name={"x"}
          //     size={20}
          //     color={"#555"}
          //     style={{ padding: 10 }}
          //     onPress={onXPress}
          //   />
          <Ionicons
            name={"close"}
            size={20}
            color={"#888"}
            style={{ padding: 10 }}
            onPress={onXPress}
          />
        )}
      </View>
    </View>
  );
}
