import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';
import { init } from "./helpers/db";



enableScreens(true);

let load = false;
init().then(() => {
  load = true;
  console.log('%c DB initialised','color:blue;background:white;padding:10,border-radius:8px');
}).catch((err) => {
  console.log('%c DB not initialised.','color:black;background:red;padding:10,border-radius:8px');
  console.log(err,'werr');
});


export default function App() {
  if(!load){
    return null;
  }
  return (
    <AppNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
