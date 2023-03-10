import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";

import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

import * as placesActions from "../store/actions/places.actions";

import Colors from "../constants/Colors";

const NewPlaceScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [selectedImage,setSelectedImage] = useState(null);
  const [selectedLocation,setSelectedLocation] = useState(null);

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleSavePlace = async () => {

    dispatch(placesActions.addPlace({ title,image:selectedImage,lng:selectedLocation.longitude,lat:selectedLocation.latitude }));

    setTitle("");
        
    navigation.goBack();
  };

  const onImageTaken = (imagePath) => {
    setSelectedImage(imagePath);
  }

  const onLocationPicked = (location) => {
    setSelectedLocation(location);
  }

 
  return (
    <ScrollView>
      <View style={{ ...styles.form }}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTitleChange}
          value={title}
        />

        <ImagePicker onImageTaken={onImageTaken}/>
        <LocationPicker  navigation={navigation} route={route} onLocationPicked={onLocationPicked}/>
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={handleSavePlace}
        />
      </View>
    </ScrollView>
  );
};

export const NewPlaceScreenOptions = ({ navigation }) => {
  return {
    headerTitle: "Add Place",
  };
};

const styles = StyleSheet.create({
  input: {
    // backgroundColor: "#212121",
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  form: {
    // paddingHorizontal:10,
    margin: 30,
    // backgroundColor:'deeppink',
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
  },
});

export default NewPlaceScreen;
