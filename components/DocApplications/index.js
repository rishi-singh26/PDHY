import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { auth, firestore } from "../../Constants/Apis";
import { showSnack } from "../../Redux/Snack/ActionCreator";
import {
  green,
  lightGreen,
  lightYellow,
  primaryColor,
  primaryErrColor,
  primaryErrLightColor,
  primarySuperLightColor,
  yellow,
} from "../../shared/Colors";
import { convertSecondsTODate } from "../../shared/Functions";
import PharmacyNdDocShimmer from "../../shared/Shimmer/PharmacyAndDocShimmer";

export default function DocApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getApplications = () => {
    try {
      auth.currentUser
        ? firestore
            .collection("doctorApplications")
            .where("applicationSubmitedByUser", "==", auth.currentUser.uid)
            // .endAt(5)
            .onSnapshot(
              (applications) => {
                let docApplications = [];
                applications.forEach((application) => {
                  const data = application.data();
                  const _id = application.id;
                  docApplications.push({ _id, ...data });
                });
                setIsLoading(false);
                setApplications(docApplications);
              },
              (err) => {
                setIsLoading(false);
                dispatch(
                  showSnack(
                    "Error in getting applications, please try again.\n" +
                      err.message
                  )
                );
                console.log(err);
              }
            )
        : dispatch(
            showSnack("You are not authenticated, try logging in again.")
          );
    } catch (err) {
      setIsLoading(true);
      dispatch(
        showSnack(
          "Error in getting applications, please try again.\n" + err.message
        )
      );
      console.log(err);
    }
  };

  const getAppliStatusIconAndColor = (statusId) => {
    let iconAndColor = {
      iconName: "file-tray-full",
      color: primaryColor,
      backColor: primarySuperLightColor,
    };
    if (parseInt(statusId) == -1) {
      iconAndColor.iconName = "close";
      iconAndColor.color = primaryErrColor;
      iconAndColor.backColor = primaryErrLightColor;
    } else if (parseInt(statusId) == 0) {
      iconAndColor.iconName = "file-tray-full";
      iconAndColor.color = primaryColor;
      iconAndColor.backColor = primarySuperLightColor;
    } else if (parseInt(statusId) == 1) {
      iconAndColor.iconName = "flag-outline";
      iconAndColor.color = yellow;
      iconAndColor.backColor = lightYellow;
    } else if (parseInt(statusId) == 2) {
      iconAndColor.iconName = "checkbox-outline";
      iconAndColor.color = green;
      iconAndColor.backColor = lightGreen;
    }
    return iconAndColor;
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
      {!isLoading && applications.length > 0 && (
        <FlatList
          data={applications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const { iconName, color, backColor } = getAppliStatusIconAndColor(
              item?.status?.id
            );
            return (
              <View style={styles.applicationContainer}>
                <View style={{ maxWidth: "75%" }}>
                  <View style={styles.horizontalView}>
                    <Text style={styles.docName}>{item.name + " - "}</Text>
                    <Text style={styles.docSpecialization}>
                      {item.specialization}
                    </Text>
                  </View>
                  <View style={{ marginTop: 4 }}>
                    <Text>
                      {item.automaticallyGeneratedAddress[0].formatted}
                    </Text>
                  </View>
                  <View style={styles.horizontalView}>
                    <Text>UPRN: </Text>
                    <Text style={{ fontWeight: "700" }}>{item.uprn}</Text>
                  </View>
                  <View style={styles.horizontalView}>
                    <Text>Submitted on: </Text>
                    <Text>
                      {convertSecondsTODate(
                        item.applicationSubmitionDate.seconds
                      ).toDateString()}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Ionicons
                    name={iconName}
                    color={color}
                    size={18}
                    style={[
                      styles.appliStatusIcon,
                      { backgroundColor: backColor },
                    ]}
                  />
                  <Text style={{ color: color }}>
                    {item?.status?.type || "NA"}
                  </Text>
                </View>
                {/* <Text>{`${item.status.id}  ${item.status.type}`}</Text> */}
                {/* <Text>{JSON.stringify(item, null, 2)}</Text> */}
              </View>
            );
          }}
        />
      )}
      {isLoading && <PharmacyNdDocShimmer numbers={[1, 2, 3]} />}
      {!isLoading && applications.length == 0 && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#555",
            marginTop: 20,
          }}
        >
          You have not submitted any applications.
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  applicationContainer: {
    backgroundColor: "#fff",
    marginTop: 7,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  docName: {
    fontSize: 19,
    color: "#333",
    fontWeight: "700",
  },
  docSpecialization: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appliStatusIcon: {
    padding: 10,
    borderRadius: 30,
  },
});
