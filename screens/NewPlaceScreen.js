import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from "react-native";
import * as placesActions from '../store/actions/places.actions'
import Colors from "../constants/Colors";

const NewPlaceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [title,setTitle] = useState('');

  const handleTitleChange = (value) => {
    setTitle(value);
  }

  const handleSavePlace = async () => {

    dispatch(placesActions.addPlace({title}));

    setTitle('');
    navigation.navigate('Places');
  }
  return (
    <ScrollView>
      <View style={{...styles.form}}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={handleTitleChange} value={title}/>
        <Button title="Save Place"  color={Colors.primary} onPress={handleSavePlace} />
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
    borderBottomColor:'#888',
    borderBottomWidth:1,
    marginBottom:10,
    paddingVertical:4,
    paddingHorizontal:2,
  },
  form:{
    // paddingHorizontal:10,
    margin:30,
    // backgroundColor:'deeppink',
  },
  label:{
    marginBottom:15,
    fontSize:18,
  }
});

export default NewPlaceScreen;
