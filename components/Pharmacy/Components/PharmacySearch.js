import React from "react";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import { View, Text, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { searchArrayOfObjects } from "../../../shared/Functions";
import Styles from "../../../shared/Styles";

class PharmacySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      pharmacySearchKey: "",
    };
  }

  onSubmit = (searchKey) => {
    const { object, city } = this.props.route.params;
    this.setState({ pharmacySearchKey: searchKey });

    const results = searchArrayOfObjects(object, searchKey, "pharmacyName");
    this.setState({ searchData: searchKey.length > 0 ? results : object });
  };

  renderSearch = () => {
    return (
      <FlatList
        data={this.state.searchData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item.name + "Pressed");
                this.props.navigation.navigate("Pharmacydetail", {
                  object: item,
                });
              }}
              style={{
                backgroundColor: "#fff",
                padding: 20,
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 6, flexDirection: "row" }}>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", minHeight: 50 }}
                  >
                    {item.pharmacyName}
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Avatar
                    rounded
                    size="medium"
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              </View>
              <Text style={{ fontSize: 15 }}>
                Established in : {item.established}
              </Text>
              <Text style={{ fontSize: 15 }}>
                Location : {item.PharmacyLocation}
              </Text>
              <Text style={{ fontSize: 15 }}>Open Till : {item.openTill}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <TextInput
            style={[Styles.textInput, { backgroundColor: "#fff" }]}
            placeholder="Search pharmacy"
            value={this.state.pharmacySearchKey}
            onChangeText={(text) => {
              this.onSubmit(text);
            }}
          />
        </View>
        <this.renderSearch />
      </SafeAreaView>
    );
  }
}

export default PharmacySearch;
