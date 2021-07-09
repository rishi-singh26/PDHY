import React, { useEffect } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import { useDispatch } from "react-redux";
// import { firestore } from "../../Constants/Apis";
import {
  hideFloatingBtn,
  showFloatingBtn,
} from "../../Redux/ShowFloatingGoToCartBtn/ActionCreator";
import { YogaCategories } from "./Data";
// import { yogaData } from "./Yoga";

export default function Yoga(props) {
  const dispatch = useDispatch();

  // const uploadYoga = () => {
  //   yogaData.map((item, index) => {
  //     item.categoryId = item.category.id;
  //     item.categoryName = item.category.name;
  //     delete item.category;
  //     item.uploadDate = new Date();
  //     firestore
  //       .collection("yogaStore")
  //       .add(item)
  //       .then(() => {})
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };

  useEffect(() => {
    // uploadYoga();
    dispatch(hideFloatingBtn());
    return () => {
      dispatch(showFloatingBtn());
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={YogaCategories}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[
                styles.categories,
                { marginRight: index % 2 != 0 ? 10 : 0 },
              ]}
              onPress={() =>
                props.navigation.navigate("YogaList", {
                  catId: item.categoryId,
                  catName: item.name,
                })
              }
            >
              <Avatar.Image
                source={item.image}
                size={190}
                style={{ backgroundColor: "#fff", borderRadius: 7 }}
              />
              <Text style={{ paddingBottom: 10, fontSize: 17 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  categories: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 7,
  },
});
