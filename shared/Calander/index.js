import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { primaryColor } from "../Colors";
import { Feather } from "@expo/vector-icons";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function CustomCalander(props) {
  const [activeDate, setActiveDate] = useState(new Date());

  const generateMatrix = () => {
    let matrix = [];
    matrix[0] = weekDays;
    let year = activeDate.getFullYear();
    let month = activeDate.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    // console.log(matrix);
    return matrix;
  };

  const matrix = generateMatrix();

  const _onPress = (item) => {
    // console.log(item);
    if (!weekDays.includes(item) && item != -1) {
      setActiveDate(new Date(activeDate.setDate(item)));
      const month = months[activeDate.getMonth()];
      const year = activeDate.getFullYear();
      const monthNum = months.findIndex((x) => x === month) + 1;
      props.onDayPress({
        dayNum: item < 10 ? `0${item}` : item,
        monthName: month,
        monthNum: monthNum < 10 ? `0${monthNum}` : monthNum,
        year,
        dateString: `${item} ${month}, ${year}`,
      });
    }
  };

  const changeMonth = (n) => {
    // console.log(new Date(activeDate.setMonth(activeDate.getMonth() + n)));
    setActiveDate(new Date(activeDate.setMonth(activeDate.getMonth() + n)));
  };

  let rows = [];
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <Text
          key={colIndex}
          style={[
            styles.calanderCol,
            {
              backgroundColor:
                item == activeDate.getDate() ? primaryColor : "#fff",
              color:
                rowIndex === 0
                  ? "#bbb"
                  : item == activeDate.getDate()
                  ? "#fff"
                  : "#000",
              fontWeight: item == activeDate.getDate() ? "700" : "600",
            },
          ]}
          onPress={() => {
            _onPress(item);
          }}
          onLongPress={() => {
            props.onDayLongPress(item);
          }}
        >
          {item != -1 ? item : ""}
        </Text>
      );
    });
    return (
      <View key={rowIndex} style={styles.calanderRow}>
        {rowItems}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.clalnderHeader}>
        <Feather
          name="chevron-left"
          size={24}
          color={"#000"}
          onPress={() => changeMonth(-1)}
        />

        <Text style={styles.headerDate}>
          {months[activeDate.getMonth()]} &nbsp;
          {activeDate.getFullYear()}
        </Text>
        <Feather
          name="chevron-right"
          size={24}
          color={"#000"}
          onPress={() => changeMonth(1)}
        />
      </View>
      {rows}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 15,
  },
  clalnderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerDate: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    color: primaryColor,
  },
  calanderRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  calanderCol: {
    flex: 1,
    textAlign: "center",
    borderRadius: 20,
    fontSize: 16,
    paddingVertical: 10,
  },
  //   calander row alternate style
  //   style={{
  //     flex: 1,
  //     height: 18,
  //     textAlign: "center",
  //     // Highlight header
  //     backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
  //     // Highlight Sundays
  //     color: colIndex == 0 ? "#a00" : "#000",
  //     // Highlight current date
  //     fontWeight: item == activeDate.getDate() ? "700" : "600",
  //   }}
});
