import * as React from "react"
import { TouchableWithoutFeedback, View, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default ({ iconName, locked, onPress, selected }) => {
  var color = "#000000"
  if (locked) {
    color = "#C5C5C5"
  }
  if (selected) {
    color = "#00a9d4"
  }
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={locked ? () => {
          Alert.alert(
            "This is a premium icon",
            "Get premium to use this icon",
            [
              { text: "Get Premium", onPress: () => {/*fill this in later*/ } },
              { text: "Cancel", onPress: () => { } }
            ]
          )
        } : onPress}
      >
        <Ionicons name={iconName} size={50} color={color} />
      </TouchableWithoutFeedback>
    </View>
  )
}