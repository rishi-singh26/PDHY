import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-elements";
import Styles from "../../../shared/Styles";

export default function DoctorSearch(props) {
  const [searchData, setSearchData] = useState([]);
  const [doctorSearchKey, setdoctorSearchKey] = useState([]);

  const onSearch = (doctorSearchKey) => {
    const { object, city } = props.route.params;
    let searchResults = [];
    const doctorsArr = [...object];

    doctorSearchKey.length > 0
      ? doctorsArr.map((item, index) => {
          if (
            item.name.toUpperCase().includes(doctorSearchKey.toUpperCase()) ||
            doctorSearchKey.toUpperCase().includes(item.name.toUpperCase())
          ) {
            console.log(item.name);
            searchResults.push(item);
          }
        })
      : setSearchData([]);
    setSearchData(searchResults);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={localStyles.searchInputView}>
        <TextInput
          style={[Styles.textInput, { backgroundColor: "#fff" }]}
          placeholder="Search doctors"
          value={doctorSearchKey}
          onChangeText={(text) => setdoctorSearchKey(text)}
          returnKeyType="search"
          onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
        />
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={searchData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item.name + "Pressed");
                props.navigation.navigate("Doctordetail", {
                  object: item,
                });
              }}
              style={localStyles.doctorsCard}
            >
              <View style={{ flex: 5 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                  }}
                >
                  {item.name}
                </Text>

                <Text style={{ fontSize: 14, color: "#888" }}>
                  {/* {specilistIn} :  */}
                  {item.type}
                </Text>
                <Text style={{ fontSize: 14, color: "#888", marginTop: 5 }}>
                  {"Location"} : {item.location}
                </Text>
              </View>
              <Avatar
                rounded
                size="medium"
                source={{ uri: item.Image }}
                containerStyle={{ marginHorizontal: 15 }}
              />
            </TouchableOpacity>
          );
        }}
      />
      {/* {searchData.length == 0 && doctorSearchKey.length > 0 ? (
        <Text
          style={localStyles.noResultTxt}
        >{`No doctor found with keyword "${doctorSearchKey}"`}</Text>
      ) : null} */}
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  searchInputView: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  doctorsCard: {
    backgroundColor: "#fff",
    marginBottom: 5,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorsCardHead: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noResultTxt: {
    fontSize: 18,
    fontWeight: "700",
    color: "#777",
    flex: 1,
    alignSelf: "center",
  },
});
