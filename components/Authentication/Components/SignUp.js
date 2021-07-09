import React, { useState } from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { primaryColor, primaryErrColor } from "../../../shared/Colors";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { signUpUser } from "../../../Redux/Auth/ActionCreator";
import { validateEmail } from "../../../shared/Functions";
import DateTimePicker from "@react-native-community/datetimepicker";

const eighteenYearsInMilliseconds =
  18 * 365 * 24 * 60 * 60 * 1000 + 4 * 24 * 60 * 60 * 1000;

export default function Signup(props) {
  // Global state
  const auth = useSelector((state) => state.auth);
  // local state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [reEnterPass, setReEnterPass] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(true);
  const [dob, setDob] = useState(null);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const [dobErr, setDobErr] = useState("");

  const dispatch = useDispatch();

  const resetErrState = () => {
    setEmailErr("");
    setPasswordErr("");
    setFullnameErr("");
    setDobErr("");
  };

  const onDobChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDobPicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  const signUpUserAfterDataValidation = () => {
    if (fullName === "") {
      resetErrState();
      setFullnameErr("Full name is empty");
      return;
    }
    if (email === "") {
      resetErrState();
      setEmailErr("Email is empty");
      return;
    }
    if (!validateEmail(email)) {
      resetErrState();
      setEmailErr("Enter a valid email");
      return;
    }
    if (pass == "") {
      resetErrState();
      setPasswordErr("Password is empty");
      return;
    }
    if (pass.length < 8) {
      resetErrState();
      setPasswordErr("Password should have minimum 8 characters");
      return;
    }
    if (pass != reEnterPass) {
      resetErrState();
      setPasswordErr("Passwords do not match");
      return;
    }
    if (!dob) {
      resetErrState();
      setDobErr("Pick date of birth");
      return;
    }
    resetErrState();
    dispatch(signUpUser({ email: email, password: pass, fullName, dob }));
  };

  return (
    <View>
      <View style={styles.header}>
        <Feather
          onPress={() => {
            props.onBackPress();
          }}
          name="chevron-left"
          size={30}
          color={"#000"}
          style={{ paddingRight: 20 }}
        />
        <Text style={styles.headerText}>SignUp</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Full name"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
          }}
          textContentType="name"
        />
        {fullnameErr.length > 0 ? (
          <Text style={styles.errTxt}>{fullnameErr}</Text>
        ) : null}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        {emailErr.length > 0 ? (
          <Text style={styles.errTxt}>{emailErr}</Text>
        ) : null}
        <View style={[styles.textInput, styles.textInputView]}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={pass}
            onChangeText={(text) => {
              setPass(text);
            }}
            style={{ flex: 1 }}
            secureTextEntry={shouldShowPassword}
          />
          <Feather
            color={"#333"}
            size={18}
            name={shouldShowPassword ? "eye" : "eye-off"}
            onPress={() => {
              setShouldShowPassword(!shouldShowPassword);
            }}
          />
        </View>
        <View style={[styles.textInput, styles.textInputView]}>
          <TextInput
            placeholder="Retype password"
            placeholderTextColor="#aaa"
            value={reEnterPass}
            onChangeText={(text) => {
              setReEnterPass(text);
            }}
            style={{ flex: 1 }}
            secureTextEntry={shouldShowPassword}
          />
          <Feather
            color={"#333"}
            size={18}
            name={shouldShowPassword ? "eye" : "eye-off"}
            onPress={() => {
              setShouldShowPassword(!shouldShowPassword);
            }}
          />
        </View>
        {passwordErr.length > 0 ? (
          <Text style={styles.errTxt}>{passwordErr}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            setShowDobPicker(true);
          }}
          style={[styles.textInput, styles.textInputView]}
        >
          <Text
            style={{
              color: dob ? "#000" : "#aaa",
              fontSize: 14,
              paddingVertical: 4,
            }}
          >
            {dob ? dob.toDateString() : "Date of birth"}
          </Text>
        </TouchableOpacity>
        {dobErr.length > 0 ? <Text style={styles.errTxt}>{dobErr}</Text> : null}
        {showDobPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob ? dob : new Date()}
            mode={"date"}
            onChange={onDobChange}
            maximumDate={
              new Date(new Date().getTime() - eighteenYearsInMilliseconds)
            }
            minimumDate={new Date(1980, 0, 1)}
          />
        )}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            signUpUserAfterDataValidation();
          }}
        >
          <Text style={styles.loginBtnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 23,
    marginVertical: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#000",
  },
  textInput: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 25,
    marginVertical: 13,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 40,
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
  },
  loginBtnTxt: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  errTxt: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 30,
    color: primaryErrColor,
  },
});
