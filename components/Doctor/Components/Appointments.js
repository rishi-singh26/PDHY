import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import RenderTimeSlots from "./RenderTimeSlots";
import { SCREEN_WIDTH } from "../../../shared/Styles";
import CustomCalander from "../../../shared/Calander";
import { auth, firestore } from "../../../Constants/Apis";
import CustomActivityIndicator from "../../../shared/CustomActivityIndicator";
import { getStringMonth } from "../../../shared/Functions";
import { useDispatch } from "react-redux";
import { showSnack } from "../../../Redux/Snack/ActionCreator";

export default function Appointment(props) {
  // local state
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(-1);
  const [timeSlotsData, setTimeSlotsData] = useState([
    {
      name: "09:00 AM - 09:30 AM",
      id: 1,
    },
    {
      name: "09:30 AM - 10:00 AM",
      id: 1,
    },
    {
      name: "10:00 AM - 10:30 AM",
      id: 1,
    },
    {
      name: "10:30 AM - 11:00 AM",
      id: 1,
    },
    {
      name: "11:00 AM - 11:30 AM",
      id: 1,
    },
    {
      name: "11:30 AM - 12:00 PM",
      id: 1,
    },
    {
      name: "12:00 PM - 12:30 PM",
      id: 1,
    },
    {
      name: "12:30 PM - 01:00 PM",
      id: 1,
    },
    {
      name: "01:00 PM - 01:30 PM",
      id: 1,
    },
    {
      name: "01:30 PM - 02:00 PM",
      id: 1,
    },
    {
      name: "12:00 PM - 12:30 PM",
      id: 1,
    },
    {
      name: "12:30 PM - 01:00 PM",
      id: 1,
    },
    {
      name: "01:00 PM - 01:30 PM",
      id: 1,
    },
    {
      name: "01:30 PM - 02:00 PM",
      id: 1,
    },
    {
      name: "02:00 PM - 02:30 PM",
      id: 1,
    },
    {
      name: "02:30 PM - 03:00 PM",
      id: 1,
    },
    {
      name: "03:00 PM - 03:30 PM",
      id: 1,
    },
    {
      name: "03:30 PM - 04:00 PM",
      id: 1,
    },
    {
      name: "04:00 PM - 04:30 PM",
      id: 1,
    },
    {
      name: "04:30 PM - 05:00 PM",
      id: 1,
    },
    {
      name: "05:00 PM - 05:30 PM",
      id: 1,
    },
    {
      name: "05:30 PM - 06:00 PM",
      id: 1,
    },
    {
      name: "06:00 PM - 06:30 PM",
      id: 1,
    },
    {
      name: "06:30 PM - 07:00 PM",
      id: 1,
    },
    {
      name: "07:00 PM - 07:30 PM",
      id: 1,
    },
    {
      name: "07:30 PM - 08:00 PM",
      id: 1,
    },
    {
      name: "08:00 PM - 08:30 PM",
      id: 1,
    },
    {
      name: "08:30 PM - 09:00 PM",
      id: 1,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const { doctorObject } = props.route.params;

  const dispatch = useDispatch();

  const doctorId = auth.currentUser.uid;

  const getTimeSlots = (day) => {
    console.log(doctorId);
    console.log(`${day.monthNum}-${day.year}, ${typeof day.dayNum}`);
    setIsLoading(true);
    firestore
      .collection("doctorCalanders")
      .doc(doctorId)
      .collection(`${day.monthNum}-${day.year}`)
      .where("dateNum", "==", `${day.dayNum}`)
      .get()
      .then((resp) => {
        let timeSlotData = [];
        resp.forEach((calander) => {
          const data = calander.data();
          const _id = calander.id;
          timeSlotData.push({ _id, ...data });
        });
        console.log("here are the slots", timeSlotData[0]);
        setTimeSlotsData(timeSlotData[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error in getting time slots", err.message);
      });
  };

  const getTodayTimeSlots = () => {
    const today = new Date();
    const date = today.getDate();
    const monthNum = today.getMonth() + 1;
    const monthName = getStringMonth(monthNum - 1);
    const year = today.getFullYear();
    const day = {
      dayNum: date < 10 ? `0${date}` : date,
      monthName,
      monthNum: monthNum < 10 ? `0${monthNum}` : monthNum,
      year,
      dateString: `${date} ${monthName}, ${year}`,
    };
    // console.log(day);
    getTimeSlots(day);
  };

  useEffect(() => {
    // getTodayTimeSlots();
  }, []);

  const confirmAppointment = () => {
    if (selectedDate == "" || selectedTimeSlotIndex == -1) {
      dispatch(showSnack("Select applintment date and timeslot!"));
      return;
    }
    const string = `Hi,\nI want to book an appointment with you on ${selectedDate.dateString} at ${timeSlotsData[selectedTimeSlotIndex]}.`;
    const phonNum =
      doctorObject.contact[0] === "+"
        ? doctorObject.contact
        : `+91${doctorObject.contact}`;
    let url = `whatsapp://send?text= ${string}&phone=${phonNum}`;
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? <CustomActivityIndicator /> : null}
      <ScrollView style={{ marginHorizontal: 15 }}>
        <CustomCalander
          onDayPress={(day) => {
            setSelectedDate(day);
            // {
            //   "dateString": "17 Jul, 2021",
            //   "dayNum": 17,
            //   "monthName": "Jul",
            //   "monthNum": "07",
            //   "year": 2021,
            // }
            // getTimeSlots(day);
          }}
          onDayLongPress={(day) => {
            console.log(day);
          }}
        />
        {isLoading ? null : (
          <View>
            <RenderTimeSlots
              timeSlots={timeSlotsData}
              onSlotPress={(index) => {
                setSelectedTimeSlotIndex(index);
              }}
              selectedIndex={selectedTimeSlotIndex}
            />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.confirmBtn} onPress={confirmAppointment}>
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#fff" }}>
          Confirm
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  confirmBtn: {
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
});
