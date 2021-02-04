import *  as React from 'react'
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Text, View, Dimensions } from "react-native"

import WeekListViewWithHeader from "../WeekListViewWithHeader/WeekListViewWithHeader"
//a caursel of storts

export default ({ selectedDayLists, nextDayLists, previousDayLists, setAddTaskPopup,
  setSelectedTask, moveWeekForward, moveWeekBack }) => {
  //views are functional components
  let render = (myItem) => {
    return (
      <View style={{ width: Dimensions.get("window").width }}>
        <WeekListViewWithHeader
          dayLists={myItem.item}
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
        data={[previousDayLists, selectedDayLists, nextDayLists]}
        renderItem={render}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { flatListRef = ref }}
        initialScrollIndex={1}
        onScrollEndDrag={(data) => {
          let threashold = 0.02
          let xOffset = data.nativeEvent.contentOffset.x / Dimensions.get("window").width
          let newIndex = Math.round(xOffset)
          let posVos = data.nativeEvent.velocity.x > 0//bool

          if (xOffset < 1 - threashold) {
            newIndex = 0
          }
          else if (xOffset > 1 + threashold) {
            newIndex = 2
          }
          flatListRef.scrollToIndex({ index: newIndex, animated: true })

        }
        }

        onScrollToIndexFailed={() => { }}

        onScroll={(data) => {
          let xOffset = data.nativeEvent.contentOffset.x / Dimensions.get("window").width
          if (xOffset == 2 || xOffset == 0) {
            //this is where we do the switch
            if (xOffset == 0) {
              moveWeekBack()
            }
            else {
              moveWeekForward()
            }
            flatListRef.scrollToIndex({ index: 1, animated: false })
          }
        }}
      />
    </SafeAreaView >
  )
}