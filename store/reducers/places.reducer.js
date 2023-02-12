import { ADD_PLACE, SET_PLACES } from "../action-types/places.action-types";
import Place from "../../models/place";
const INITIAL_STATE = {
  places:[]
}


const placesReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case ADD_PLACE:
      const {id,title,image,address,lat,lng} = action.payload;
      const place = new Place(id.toString(),title,image,address,lat,lng);
      console.log(place,'newPlace');
      const updatedPlaces = [...state.places,place];
      return {
        ...state,
        places:updatedPlaces,
      }
    


    case SET_PLACES:
      const newPlaces = action.payload; 
      console.log(newPlaces , 'places in store');
     return {
      ...state,
      places:newPlaces
     }
    default:
      return state;
    }
    return state;
}

export default placesReducer;