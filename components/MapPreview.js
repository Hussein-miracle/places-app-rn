import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

import ENV from "../env";

const MapPreview = ({ location, children, styl , onPressMap }) => {
  let imagePreviewUrl;
  if (location) {
    const { latitude:lat, longitude:lng } = location;
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    markers=color:red%7Clabel:A%7C${lat},${lng}
    &key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity style={{ ...styles.mapPreview, ...styl }} onPress={onPressMap}>
      {location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
