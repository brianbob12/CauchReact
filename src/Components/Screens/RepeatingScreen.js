import * as React from "react"
import { StyleSheet, Text, View } from "react-native";
import Header from "../Headers/MultipurposeAddHeader.js"
import Constants from "expo-constants"

//borrow a component from WeekListSlider
import DayListView from "../WeekSlider/WeekListView/DayListView.js"

export default () => {
  var repeatingTasks = []
  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <Header
        text={"Repeating Tasks"}
        onPlusButton={() => {

        }}
      />
      <View style={{ flex: 1 }}>

      </View>
    </View>
  )
}