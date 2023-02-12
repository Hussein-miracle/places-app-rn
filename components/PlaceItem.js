import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import Colors from "../constants/Colors";

const PlaceItem = ({ item,onSelect }) => {
  const { title,address,imageUri,lat,lng } = item;
  return (
    <TouchableOpacity style={styles.placeItem} onPress={onSelect}>
      <Image source={{uri:imageUri}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.address}>{lat}</Text>
        <Text style={styles.address}>{lng}</Text>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  }
});



export default PlaceItem;
