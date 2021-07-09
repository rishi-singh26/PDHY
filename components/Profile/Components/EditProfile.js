import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

export default function EditProfile(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Camera roll permissions is required to choose an image.");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.card}>
        {image != null ? (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("ImageViewer", {
                imgSrc: { uri: image.uri },
              })
            }
          >
            <Image source={{ uri: image.uri }} style={styles.imageStyle} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.imageEditIconStyle}
            onPress={() => {
              pickImage();
            }}
          >
            <Feather name="edit-2" size={22} color="#999" />
          </TouchableOpacity>
        )}
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.textInput}
          placeholder="Name"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 15,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imageEditIconStyle: {
    backgroundColor: "#f2f2f2",
    padding: 40,
    borderRadius: 70,
  },
  textInput: {
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    width: "90%",
    marginTop: 30,
    fontSize: 17,
  },
});
