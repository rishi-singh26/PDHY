import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import styles, { SCREEN_WIDTH } from "../../../shared/Styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { primaryColor } from "../../../shared/Colors";
import ReadMore from "react-native-read-more-text";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import { useDispatch } from "react-redux";
import { showSnack } from "../../../Redux/Snack/ActionCreator";

export default function Doctordetail(props) {
  // const [language, setLanguage] = useState("English");
  // Linking.openURL("whatsapp://send?text=Hello!! My name is Rishi&phone=+916362056288");

  const { object: doctorObject, language } = props.route.params;

  const dispatch = useDispatch();

  const sendEmail = () => {
    let url = `mailto:${doctorObject.email}`;

    Linking.canOpenURL(url)
      ? Linking.openURL(url)
      : dispatch(
          showSnack(
            `Could not send email, check the emailId ${doctorObject.email}`
          )
        );
  };

  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:" + doctorObject.contact;
    } else {
      phoneNumber = "telprompt:" + doctorObject.contact;
    }

    Linking.canOpenURL(phoneNumber)
      ? Linking.openURL(phoneNumber)
      : dispatch(
          showSnack(
            `Could not dial call, check the phone number ${doctorObject.contact}`
          )
        );
  };

  const rednerDoctorDetail = (
    specilisation,
    education,
    experience,
    address,
    timing
  ) => {
    return (
      <>
        <Text style={styles.detail}>
          {education}:{" "}
          <Text style={{ fontWeight: "bold" }}>{doctorObject.education}</Text>
        </Text>
        <Text style={styles.detail}>
          {experience}:{" "}
          <Text style={{ fontWeight: "bold" }}>{doctorObject.experiance}</Text>
        </Text>
        <Text style={styles.detail}>
          {address}:{" "}
          <Text style={{ fontWeight: "bold" }}>{doctorObject.location}</Text>
        </Text>
        <Text style={styles.detail}>
          {timing}:{" "}
          <Text style={{ fontWeight: "bold" }}>{doctorObject.timing}</Text>
        </Text>
        {/* <Text style={styles.detail}>{doctorObject.discription}</Text> */}
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
          <ReadMore numberOfLines={1}>
            <Text
              style={[
                styles.detail,
                { fontSize: 15, color: "#777", lineHeight: 20 },
              ]}
            >
              {doctorObject.discription}
            </Text>
          </ReadMore>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={localStyles.callDocBtn} onPress={dialCall}>
            <Text
              style={{
                color: primaryColor,
                fontWeight: "700",
                marginRight: 20,
              }}
            >
              CALL DOCTOR
            </Text>
            <Feather name={"phone"} color={primaryColor} size={20} />
          </TouchableOpacity>
          {doctorObject.email && (
            <TouchableOpacity
              style={localStyles.callDocBtn}
              onPress={sendEmail}
            >
              <Text
                style={{
                  color: primaryColor,
                  fontWeight: "700",
                  marginRight: 20,
                }}
              >
                EMAIL DOCTOR
              </Text>
              <Feather name={"mail"} color={primaryColor} size={20} />
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  const shareDoctorRef = useRef(null);

  const shareDoctorDetails = () => {
    console.log("Hola");
    shareDoctorRef.current.capture().then(async (uri) => {
      console.log("do something with ", uri);
      if (!(await Sharing.isAvailableAsync())) {
        alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }

      await Sharing.shareAsync(uri);
    });
  };

  const setHeaderOptions = () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginHorizontal: 30 }}
            onPress={() => {
              shareDoctorDetails();
            }}
          >
            <MaterialIcons name="share" size={23} color="black" />
          </TouchableOpacity>
        );
      },
    });
  };

  useEffect(() => {
    setHeaderOptions();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", elevation: 0.3 }}>
      <ViewShot ref={shareDoctorRef} options={{ format: "jpg", quality: 1.0 }}>
        <ScrollView
          style={{
            marginHorizontal: 10,
            zIndex: 1000,
            backgroundColor: "#fff",
          }}
        >
          <View style={localStyles.docCard}>
            <Text style={localStyles.docCardTitle}>{doctorObject.name}</Text>
            <Text style={[localStyles.docCardTitle, { fontSize: 17 }]}>
              {doctorObject.type}
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("ImageViewer", {
                  imgData: { image: doctorObject.Image },
                })
              }
            >
              <Image
                source={{ uri: doctorObject.Image }}
                style={localStyles.docCardImg}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            {language != "Kannada"
              ? rednerDoctorDetail(
                  "Specilisation in",
                  "Education",
                  "Experience",
                  "Address",
                  "Timing"
                )
              : rednerDoctorDetail(
                  "ಇನ್ ಸ್ಪೆಸಿಲೈಸೇಶನ್",
                  "ಶಿಕ್ಷಣ",
                  "ಅನುಭವ",
                  "ವಿಳಾಸ",
                  "ಸಮಯ"
                )}
          </View>
        </ScrollView>
      </ViewShot>
      <TouchableOpacity
        style={localStyles.createApointmentBtn}
        onPress={() => {
          props.navigation.navigate("Appointment", { doctorObject });
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
          Appointment
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  callDocBtn: {
    flexDirection: "row",
    fontSize: 17,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    color: "#33a1f5",
    alignItems: "center",
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 7,
    alignSelf: "flex-end",
  },
  createApointmentBtn: {
    position: "absolute",
    bottom: 40,
    left: (SCREEN_WIDTH - 200) / 2,
    borderRadius: 13,
    backgroundColor: "#000",
    flexDirection: "row",
    width: 200,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  docCard: {
    backgroundColor: primaryColor,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
    padding: 20,
  },
  docCardTitle: {
    color: "#fff",
    paddingTop: 10,
    fontSize: 22,
    fontWeight: "700",
  },
  docCardImg: { height: 105, width: 105, borderRadius: 55, marginTop: 20 },
});
