import { ADD_PLACE } from "../action-types/places.action-types";



export const addPlace = ({title}) => {
  return {
    type:ADD_PLACE,
    payload:{
      title,
    }
  }
}