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
import { auth, firestore } from "../../Constants/Apis";
import {
  hideFloatingBtn,
  showFloatingBtn,
} from "../../Redux/ShowFloatingGoToCartBtn/ActionCreator";
import { showSnack } from "../../Redux/Snack/ActionCreator";
import SearchBar from "../../shared/Components/SearchBar";
import { searchArrayOfObjects } from "../../shared/Functions";
import YogaShimmer from "../../shared/Shimmer/YogaShimmer";
import { SCREEN_WIDTH } from "../../shared/Styles";

export default function HomeRemedies(props) {
  const [remedies, setRemedies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();

  const getRemediesFromStore = () => {
    if (!auth.currentUser) {
      dispatch(
        showSnack("Authentication error, please logout and login again.")
      );
      return false;
    }
    firestore
      .collection("homeRemediesStore")
      .get()
      .then((remedyList) => {
        let remedies = [];
        remedyList.forEach((remedy) => {
          const data = remedy.data();
          const _id = remedy.id;
          remedies.push({ _id, ...data });
        });
        setRemedies(remedies);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(showSnack("Could not get remedies, please try again."));
        console.log("Error in getting REMEDIES", err);
      });
  };

  useEffect(() => {
    getRemediesFromStore();
  }, []);

  useEffect(() => {
    // uploadYoga();
    dispatch(hideFloatingBtn());
    return () => {
      dispatch(showFloatingBtn());
    };
  }, []);

  const closeSearch = () => {
    setSearchKey("");
    getRemediesFromStore();
  };

  const searchYoga = () => {
    if (searchKey.length > 0) {
      setIsLoading(true);
      setSearchKey(searchKey);
      setRemedies(searchArrayOfObjects(remedies, searchKey, "name"));
      setIsLoading(false);
    } else {
      getRemediesFromStore();
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
      {!isLoading && remedies.length > 0 && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={remedies}
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
                <View>
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={styles.videoThumbnail}
                  />
                  {item.videoLength ? (
                    <View style={styles.videoLength}>
                      <Text style={{ color: "#fff" }}>{item.videoLength}</Text>
                    </View>
                  ) : null}
                </View>
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
    bottom: 10,
    right: 10,
  },
  videoThumbnail: {
    height: 200,
    width: SCREEN_WIDTH - 30,
  },
});
