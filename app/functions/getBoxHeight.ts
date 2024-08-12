import {Dimensions} from 'react-native'

export default function getBoxHeight(number: number) {
  const windowHeight = Dimensions.get("window").height;
  return (windowHeight - 130) / number; //5 - constant value length of array, 50 - constant value height of bottom panel
}
