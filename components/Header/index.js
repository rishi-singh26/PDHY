import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../../shared/Styles";
import { primaryColor } from "../../shared/Colors";

export default function Header(props) {
  const { showActionSheetWithOptions } = useActionSheet();

  const openMenuActionSheet = () => {
    const options = [
      // "Change language",
      "Change location",
      props.creationText,
      "Cancel",
    ];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;
    const textStyle = { fontWeight: "700", fontSize: 17 };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle,
      },
      (buttonIndex) => {
        // if (buttonIndex === 0) {
        //   openLanguageChangeSheet();
        //   return;
        // } else
        if (buttonIndex === 0) {
          props.locationChangeFunc();
          return;
        } else if (buttonIndex === 1) {
          props.onCreationPress();
          return;
        }
      }
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 3,
        paddingTop: 45,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={props.onLocationPress}
        style={{ marginLeft: 5 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={27} color={primaryColor} />
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginLeft: 7,
                color: "#000",
              }}
            >
              {props.title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                marginLeft: 7,
                color: "#555",
                width: (SCREEN_WIDTH / 6) * 4,
              }}
              numberOfLines={2}
            >
              {props.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#f2f2f2",
          padding: 7,
          borderRadius: 25,
          marginRight: 10,
        }}
        onPress={() => {
          props.onUserAvatarPress();
        }}
      >
        <Feather name="user" size={25} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
