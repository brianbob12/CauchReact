import *  as React from 'react'
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Text, View, Dimensions } from "react-native"

import WeekListViewWithHeader from "../WeekListViewWithHeader/WeekListViewWithHeader"
//a caursel of storts

export default ({ mondayDayList, tuesdayDayList, wednesdayDayList, thursdayDayList,
  fridayDayList, saturdayDayList, sundayDayList, setAddTaskPopup, setSelectedTask }) => {
  //views are functional components
  let render = (myItem) => {
    return (
      <View style={{ width: Dimensions.get("window").width }}>
        <WeekListViewWithHeader
          mondayDayList={mondayDayList}
          tuesdayDayList={tuesdayDayList}
          wednesdayDayList={wednesdayDayList}
          thursdayDayList={thursdayDayList}
          fridayDayList={fridayDayList}
          saturdayDayList={saturdayDayList}
          sundayDayList={sundayDayList}
          setAddTaskPopup={(item) => { setAddTaskPopup(item) }}
          setSelectedTask={(item) => { setSelectedTask(item) }}
        />
      </View>
    )
  }
  let flatListRef
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[0, 1, 2]}
        renderItem={render}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { flatListRef = ref }}
        initialScrollIndex={1}
        onScrollEndDrag={(data) => {
          let threashold = 0.1
          let xOffset = data.nativeEvent.contentOffset.x / Dimensions.get("window").width
          let newIndex = Math.round(xOffset)
          let posVos = data.nativeEvent.velocity.x > 0//bool

          if (xOffset > threashold && xOffset < 1 - threashold) {
            if (!posVos) {
              newIndex = 1
            }
            else {
              newIndex = 0
            }
          }
          if (xOffset > 1 + threashold && xOffset < 2 - threashold) {
            if (!posVos) {
              newIndex = 2
            }
            else {
              newIndex = 1
            }
          }
          flatListRef.scrollToIndex({ index: newIndex, animated: true })
        }
        }
      />
    </SafeAreaView >
  )
}