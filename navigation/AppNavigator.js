import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { Provider } from "react-redux";
import { combineReducers, createStore , applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import PlacesListScreen, {
  PlacesListScreenOptions,
} from "../screens/PlacesListScreen";

import PlaceDetailScreen,{PlaceDetailScreenOptions} from "../screens/PlaceDetailScreen";

import NewPlaceScreen, {
  NewPlaceScreenOptions,
} from "../screens/NewPlaceScreen";

import MapScreen,{MapScreenOptions} from "../screens/MapScreen";

import Colors from "../constants/Colors";
import placesReducer from "../store/reducers/places.reducer";

const rootReducer = combineReducers({
  places: placesReducer,
});

const middlewares = [ReduxThunk];

if(process.env.NODE_ENV === 'development'){
  middlewares.push(composeWithDevTools)
}
const store = createStore(rootReducer,applyMiddleware(...middlewares)) ;

const Stack = createNativeStackNavigator();

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="lightgreen" />
      <OverflowMenuProvider>
        <Provider store={store}>
          <Stack.Navigator
            initialRouteName="Places"
            screenOptions={defaultHeaderOptions}
          >
            <Stack.Screen
              name="Places"
              component={PlacesListScreen}
              options={PlacesListScreenOptions}
            />
            <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={PlaceDetailScreenOptions}/>
            <Stack.Screen
              name="NewPlace"
              component={NewPlaceScreen}
              options={NewPlaceScreenOptions}
            />
            <Stack.Screen name="Map" component={MapScreen} options={MapScreenOptions}/>
          </Stack.Navigator>
        </Provider>
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
