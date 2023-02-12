import { ADD_PLACE } from "../action-types/places.action-types";
import Place from "../../models/place";
const INITIAL_STATE = {
  places:[]
}


const placesReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case ADD_PLACE:{
      const {id,title,image} = action.payload;
      const place = new Place(id.toString(),title,image);
      const updatedPlaces = [...state.places,place];
      return {
        places:updatedPlaces,
      }
    }
    default:
      return state;
    }
    return state;
}

export default placesReducer;