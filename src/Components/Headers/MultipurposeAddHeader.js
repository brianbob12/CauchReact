import * as React from "react"
import { View, Text, TouchableWithoutFeedback } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default ({ text, onPlusButton }) => {
  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#FFFFFFFF",
          borderBottomColor: "#d8d8d8",
          borderBottomWidth: 1,
          justifyContent: "space-between",
          alignContent: "center",
          flexDirection: "row"
        }}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="reorder-four" size={35} color="gray" />
        </View>
        <View style={{ flex: 4, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>{text}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
          <TouchableWithoutFeedback onPress={onPlusButton}>
            <Ionicons name="add" size={35} color="gray" />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}