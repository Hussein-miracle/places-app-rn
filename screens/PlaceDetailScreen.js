import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailScreen = ({navigation}) => {
  return (
    <View>
      <Text>
        PlaceDetailScreen
      </Text>
    </View>
  )
}


export const PlaceDetailScreenOptions = ({navigation,route}) => {

  const {placeTitle} = route.params;

  return {
    headerTitle:placeTitle,
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
  }
})

export default PlaceDetailScreen