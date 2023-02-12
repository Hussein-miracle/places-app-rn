import React, { useState, useCallback, useEffect } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handlePressMap = (event) => {
    event.persist();
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };

  const savePickedLocation = useCallback(() => {
    console.log("saving location...");
    console.log(selectedLocation, "slE");
    if (!selectedLocation) {
      Alert.alert(
        "No Location Selected",
        "You have to select a location to save",
        [{ text: "Okay" }]
      );
      return;
    }

    navigation.navigate("NewPlace", {
      pickedLocation:selectedLocation,
    });
    // navigation.goBack();
    console.log("location saved.");
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={styles.headerBtn} onPress={savePickedLocation}>
            <Text style={styles.headerBtnText}>Save</Text>
          </TouchableOpacity>
        );
      },
    });

    // navigation.setParams({
    //   saveLocation: savePickedLocation,
    // });


  }, [savePickedLocation]);



  let markerCoord;
  if (selectedLocation) {
    markerCoord = selectedLocation;
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} onPress={handlePressMap}>
        {markerCoord && (
          <Marker title="Picked Location" coordinate={markerCoord}></Marker>
        )}
      </MapView>
    </View>
  );
};

export const MapScreenOptions = ({ navigation, route }) => {
  // console.log(route, "rtotu");
  // const { saveLocation } = route.params;
  return {
    // headerRight: () => {
    //   return (
    //     <TouchableOpacity style={styles.headerBtn} onPress={saveLocation}>
    //       <Text style={styles.headerBtnText}>Save</Text>
    //     </TouchableOpacity>
    //   );
    // },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  headerBtn: {
    marginHorizontal: 20,
    backgroundColor: "#212121",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  headerBtnText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "#fff" : Colors.primary,
  },
});

export default MapScreen;
