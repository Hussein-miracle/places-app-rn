import * as ExpoFileSystem from "expo-file-system";

import { ADD_PLACE, SET_PLACES } from "../action-types/places.action-types";

import { insertPlace, fetchPlaces} from "../../helpers/db";

export const addPlace = ({ title, image }) => {
  return async (dispatch) => {
    const filename = image.split('/').pop();
    console.log(filename,'imageFileName');
    const newPath = ExpoFileSystem.documentDirectory + filename;
    try {
      await ExpoFileSystem.moveAsync({
      from:image,
      to:newPath
    })
    const dbResult = await insertPlace(title,newPath,'Dummy Address',15.6,12.3);
    console.log(dbResult,'dbResult');
    dispatch({
      type: ADD_PLACE,
      payload: {
        id:dbResult.insertId,
        title,
        image:newPath,
      },
    })
    ;
  }catch(err){
    console.log(err,'err');
    throw err;
  }

  };
};


export const loadPlaces = () => {
  return  async (dispatch) => {
    const placesResult = await fetchPlaces();
    // console.log(placesResult,'places essult')

    dispatch({
      type:SET_PLACES,
      payload:placesResult.rows._array,
    })
  }
}
