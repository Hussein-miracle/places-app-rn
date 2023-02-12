import React, { useState } from "react";
import * as ImgPicker from "expo-image-picker";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImagePicker = ({onImageTaken}) => {
  const [imgUrl, setImg] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    console.log(result, "permissions result");

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };
  const handleTakeImage = async () => {
    const pickAccess = verifyPermissions();

    if (pickAccess) {
      const imgResponse = await ImgPicker.launchCameraAsync({
        allowsEditing:true,
        aspect:[16,9],
        quality:0.5,
      });
      console.log(imgResponse, "img");
      const image = imgResponse.assets[0];

      const uri = image.uri;
      setImg(uri);
      onImageTaken(uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!imgUrl  ? (
          <Text style={styles.imgText}>No image selected</Text>
        ) :  <Image source={{ uri: imgUrl }} style={styles.image} />}
      </View>

      <View style={styles.btn}>
        <Button
          title="Take Image"
          color={Colors.primary}
          onPress={handleTakeImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#333",
    borderWidth: 2,
    // padding:4,
    borderRadius: 6,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imgText: {
    marginTop: "25%",
  },
  btn: {
    marginVertical: 10,
  },
});

export default ImagePicker;
