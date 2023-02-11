import React from 'react';
import { View,StyleSheet, Text,Platform } from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import CHeaderButton from '../components/HeaderButton';

const PlacesListScreen = ({navigation}) => {
  const places = useSelector((s) => s.places.places);
  if(places.length <= 0 ){
    return (
      <View style={styles.screen}>
        <Text>No Places ueyt</Text>
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <Text>PlacesListScreen</Text>
      <View>
        {
          places.map((i,k) => {
            return <Text key={k}>{i}</Text>
          })
        }
      </View>
    </View>
  )
}



export const PlacesListScreenOptions  = ({navigation}) => {
  console.log(navigation,'bnav')
  const onPressHeaderRight = () => {
    navigation.navigate('NewPlace')
  }
  return {
    headerTitle:'All Places',
    headerRight:()=>{
      return (
        <HeaderButtons HeaderButtonComponent={CHeaderButton}>
          <Item title='Add Place' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add' }  onPress={onPressHeaderRight}/>
        </HeaderButtons>
      )
    }
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    // backgroundColor:Colors.primary,
    // color:'#000',
    padding:5,
    alignItems:'center',
    textAlign:'center',
  }
})

export default PlacesListScreen