import * as ExpoFileSystem from "expo-file-system";

import { ADD_PLACE } from "../action-types/places.action-types";
import { insertPlace } from "../../helpers/db";

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
        id:deResult.insertId,
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
