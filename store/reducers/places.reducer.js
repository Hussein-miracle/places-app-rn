import { ADD_PLACE } from "../action-types/places.action-types";

const INITIAL_STATE = {
  places:[]
}


const placesReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case ADD_PLACE:{
      const {title} = action.payload;
      const updatedPlaces = [...state.places,title];
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