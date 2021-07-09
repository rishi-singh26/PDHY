import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  View,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { auth, firestore } from "../../../Constants/Apis";
import { showSnack } from "../../../Redux/Snack/ActionCreator";
import YogaShimmer from "../../../shared/Shimmer/YogaShimmer";
import { SCREEN_WIDTH } from "../../../shared/Styles";
import SearchBar from "../../../shared/Components/SearchBar";
import { searchArrayOfObjects } from "../../../shared/Functions";

export default function YogaList(props) {
  const [yogas, setYogas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();

  const { catId, catName } = props.route.params;

  const setHeaderOptions = () => {
    props.navigation.setOptions({
      title: `Yoga (${catName})`,
    });
  };

  const getYogaFromStore = () => {
    if (!auth.currentUser) {
      dispatch(
        showSnack("Authentication error, please logout and login again.")
      );
      return false;
    }
    firestore
      .collection("yogaStore")
      .where("categoryId", "==", catId)
      .get()
      .then((yogaList) => {
        let yogas = [];
        yogaList.forEach((yoga) => {
          const data = yoga.data();
          const _id = yoga.id;
          yogas.push({ _id, ...data });
        });
        setYogas(yogas);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(showSnack("Could not get yogas, please try again."));
        console.log("Error in getting YOGAS", err);
      });
  };

  useEffect(() => {
    setHeaderOptions();
    getYogaFromStore();
  }, []);

  const closeSearch = () => {
    setSearchKey("");
    getYogaFromStore();
  };

  const searchYoga = () => {
    if (searchKey.length > 0) {
      setIsLoading(true);
      setSearchKey(searchKey);
      setYogas(searchArrayOfObjects(yogas, searchKey, "name"));
      setIsLoading(false);
    } else {
      getYogaFromStore();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        onTextChange={(text) => setSearchKey(text)}
        searchKey={searchKey}
        onXPress={closeSearch}
        onSubmitEditing={searchYoga}
      />
      {!isLoading && yogas.length > 0 && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={yogas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  Linking.canOpenURL(item.videoUrl)
                    ? Linking.openURL(item.videoUrl)
                    : dispatch(showSnack("Can not open this video."))
                }
              >
                <Image
                  source={{ uri: item.thumbnailUrl }}
                  style={styles.videoThumbnail}
                />
                {item.videoLength ? (
                  <View style={styles.videoLength}>
                    <Text style={{ color: "#fff" }}>{item.videoLength}</Text>
                  </View>
                ) : null}
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
                <Text style={{ paddingTop: 3 }}>{item.description}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {isLoading && <YogaShimmer numbers={[1, 2, 3]} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 7,
  },
  videoLength: {
    borderRadius: 2,
    padding: 2,
    maxWidth: 40,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 130,
    right: 10,
  },
  videoThumbnail: {
    height: 200,
    width: SCREEN_WIDTH - 30,
  },
});
