import React, { useState ,useEffect } from "react";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import MapPreview from "./MapPreview";
import Colors from "../constants/Colors";

const LocationPicker = ({navigation,route,onLocationPicked}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);
  const mapPickedLocation = route.params;
  console.log(mapPickedLocation , 'routes' );



  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    console.log(result, "permissions result");
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };
  const getLocationHandler = async () => {
    const pickAccess = await verifyPermissions();
    if (!pickAccess) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      // console.log(location, "location dat");
      const { latitude, longitude } = location.coords;
      setPickedLocation({
        latitude: latitude,
        longitude: longitude,
      });
      onLocationPicked({latitude,longitude});
    } catch (err) {
      Alert.alert(
        "Error Fetching Location!.",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
      console.log(err, "error getting location");
    }
    setIsFetching(false);
  };


  useEffect(() => {
    if(mapPickedLocation?.pickedLocation){
      setPickedLocation(mapPickedLocation?.pickedLocation);
      onLocationPicked(mapPickedLocation?.pickedLocation);
    }
  },[mapPickedLocation])

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  }

  return (
    <View style={styles.locationPicker}>
      {/* <View style={{ ...styles.mapPreview, paddingTop: isFetching ? 40 : 0 }}> */}
      <MapPreview styl={{ ...styles.mapPreview }} location={pickedLocation} onPressMap={pickOnMapHandler}>
        {isFetching ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text style={styles.locationText}>No Location chosen yet.</Text>
        )}
      </MapPreview>
      {/* </View> */}

      <View style={styles.btn}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick On Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginVertical: 5,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    // padding:1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginVertical: 10,
    justifyContent:'space-between',
    alignItems: "center",
    // alignSelf: "center",
    flexDirection:'row',
    // borderRadius:16,
    width:'100%'
  },
  locationText: {},
});
export default LocationPicker;
