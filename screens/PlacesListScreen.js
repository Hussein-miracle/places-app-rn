import React, { useEffect } from "react";
import { View, StyleSheet, Text, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import CHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";

import Colors from "../constants/Colors";
import { loadPlaces } from "../store/actions/places.actions";


const PlacesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((s) => s.places.places);

  useEffect(() => {
    dispatch(loadPlaces());
  },[dispatch])

  if (places.length <= 0) {
    return (
      <View style={styles.screen}>
        <Text>No Places yet</Text>
      </View>
    );
  }


  return (
    <View style={styles.screen}>
      <FlatList
        data={places}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => {

          const onSelect = () => {
            navigation.navigate('PlaceDetail',{
              placeTitle:item.title,
              placeId:item.id
            });
          }

          return <PlaceItem item={item} onSelect={onSelect}/>;
        }}
      />
    </View>
  );
};

export const PlacesListScreenOptions = ({ navigation }) => {
  // console.log(navigation, "bnav");
  const onPressHeaderRight = () => {
    navigation.navigate("NewPlace");
  };
  return {
    headerTitle: "All Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={onPressHeaderRight}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor:Colors.primary,
    // color:'#000',
    padding: 5,
    alignItems: "center",
    textAlign: "center",
  },
});

export default PlacesListScreen;
