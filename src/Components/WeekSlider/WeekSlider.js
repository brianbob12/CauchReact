import *  as React from 'react'
import { SafeAreaView, FlatList, StyleSheet, ScrollView, Text, View, Dimensions } from "react-native"
import { useState } from 'react'
import WeekListViewWithHeader from "./WeekListView/WeekListViewWithHeader.js"
//a caursel of storts

export default ({ selectedDayLists, nextDayLists, previousDayLists, setAddTaskPopup,
  setSelectedTask, moveWeekForward1, moveWeekBack1, moveWeekForward2, moveWeekBack2 }) => {
  const [readyToScroll, setReadyToScroll] = useState(false)
  const [data, setData] = useState({})
  const [changeTriggered, setChangeTriggered] = useState(false)//indicates if a swipe has been initiated
  //the data hook is only used under the condition that readyToScroll=true
  //this is part of the scrolling system

  //callbacks for when WeekLists have finished loading their tasks
  const onFinishedLoading = (index) => {
    //Since I am scrolling to the middle slide I only care about when the middle slide is finished loading
    if (index == 1) {
      //we are finally ready to scroll
      if (readyToScroll && flatListRef != null) {
        flatListRef.scrollToIndex({ index: 1, animated: false })
        if (data.backwards) {
          moveWeekBack2(data.data)
        }
        else {
          moveWeekForward2(data.data)
        }
        setReadyToScroll(false)
      }
    }
  }
  //views are functional components
  let render = (myItem) => {
    return (
      <View style={{ width: Dimensions.get("window").width }}>
        <WeekListViewWithHeader
          dayLists={myItem.item.content}
          setAddTaskPopup={(item) => { setAddTaskPopup(item) }}
          setSelectedTask={(item, day) => { setSelectedTask(item, day) }}
          onFinishedLoadingWeek={() => { onFinishedLoading(myItem.index.toString()) }}
        />
      </View>
    )
  }
  let flatListRef
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={
          [
            {
              id: "0x0",
              content: previousDayLists
            },
            {
              id: "0x1",
              content: selectedDayLists
            },
            {
              id: "0x2",
              content: nextDayLists
            }
          ]
        }
        renderItem={render}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          flatListRef = ref
        }}
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
          //xOffset may get near to 2 but never actually reach 2
          const scrollTolerance = 0.0001//That's reasonable
          if (!changeTriggered && (
            (xOffset < 2 + scrollTolerance && xOffset > 2 - scrollTolerance) ||
            (xOffset < 0 + scrollTolerance && xOffset > 0 - scrollTolerance))) {
            //this is where we do the switch
            if (xOffset < 0 + scrollTolerance && xOffset > 0 - scrollTolerance) {
              //console.log(xOffset)
              moveWeekBack1((data) => {
                setReadyToScroll(true)
                setChangeTriggered(false)
                setData({ data: data, backwards: true })
                //wait for rerender
              })
            }
            else {
              moveWeekForward1((data) => {
                setReadyToScroll(true)
                setChangeTriggered(false)
                setData({ data: data, backwards: false })
              })
            }
            //the scroll will happen after the first reredner
          }
        }}
        getItemLayout={(data, index) => {
          return ({
            length: Dimensions.get("window").width,
            offset: Dimensions.get("window").width * index,
            index
          })
        }}

        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView >
  )
}