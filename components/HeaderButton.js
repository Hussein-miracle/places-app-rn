import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Colors from "../constants/Colors";


const CHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={Ionicons}  iconSize={22}    color={Platform.OS === 'android' ? '#fff' : Colors.primary } />
  )
}

export default CHeaderButton;