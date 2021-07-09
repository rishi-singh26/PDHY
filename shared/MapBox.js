import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { primaryColor } from "./Colors";
import { getLocation } from "./Functions";
import { geoCoderApi } from "../Constants/Apis";
import Axios from "axios";
import { Assets } from "../assets";

const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0006;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapBox(props) {
  const [region, setRegion] = useState({
    latitude: 12.515721,
    longitude: 76.880943,
  });
  const mapRef = useRef(null);

  const animateTUserLocation = async () => {
    const { location, errmess, status } = await getLocation();
    const latLong = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    if (status) {
      setRegion(latLong);
      props.regionSetter(latLong);
    }
    mapRef.current.animateToRegion({
      ...latLong,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const getGeoCode = (latitude, longitude) => {
    props.addressSetter("Loading...");
    const url = geoCoderApi(latitude, longitude);
    Axios.get(url)
      .then((resp) => {
        const { total_results, results } = resp.data;
        props.addressSetter(results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onRegionChange = (region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    getGeoCode(latitude, longitude);
  };

  useEffect(() => {
    animateTUserLocation();
  }, []);

  return (
    <View style={{ height: props.height }}>
      <MapView
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={true}
        style={styles.mapStyle}
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        //   customMapStyle={silver}
      ></MapView>
      <Image style={[styles.pin, props.pinStyle]} source={Assets.pin} />
      <TouchableOpacity
        onPress={animateTUserLocation}
        style={styles.myLocationBtn}
      >
        <MaterialIcons name="my-location" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  myLocationBtn: {
    backgroundColor: primaryColor,
    borderRadius: 7,
    position: "absolute",
    zIndex: 1000,
    top: 10,
    right: 10,
    padding: 8,
  },
  pin: {
    height: 55,
    width: 55,
    position: "absolute",
    zIndex: 1000,
    alignSelf: "center",
    top: "43%",
    right: "41.5%",
  },
});
