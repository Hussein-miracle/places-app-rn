import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handlePressMap = (event) => {
    event.persist();
    console.log(event, "eMap");
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({
      latitude,
      longitude,
    });
  };

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

export const MapScreenOptions = () => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>Save</Text>
        </TouchableOpacity>
      );
    },
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
    marginHorizontal:20,
  },
  headerBtnText: {
    fontSize:16,
    color: Platform.OS === 'android' ? '#fff' : Colors.primary
  },
});

export default MapScreen;
