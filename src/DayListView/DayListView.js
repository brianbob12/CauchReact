import *  as React from 'react'
import { useState } from 'react'
import { DragSortableView } from "react-native-drag-sort";

import { Dimensions, ScrollView, SafeAreaView, Text, View } from "react-native"
//shows a drag and drop list of all tasks in a given dayList
//must be in a SafeAreaView

//TEMPORARY
import SaveTaskToCache from "../Tasks/Caching/SaveTaskToCache.js"
import GetTaskFromCache from "../Tasks/Caching/GetTaskFromCache.js"

//setup variables
const { width } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48
const childrenSpacing = 8

export default (props, context) => {

  //hooks
  const [displayedTasks, setDisplayedTasks] = useState([])
  const [scrollEnabled, setScrollEnabled] = useState(true)

  //not hooks

  for (let i = 0; i < 30; i++) {
    displayedTasks.push({
      name: "testTask1",
      description: "testDescription",
      id: "44"
    })
  }


  SaveTaskToCache({
    name: "savedTaskTest",
    description: "This task was saved to cache",
    id: "0"
  }).then(() => {
    GetTaskFromCache("0").then((result) => {
      //setDisplayedTasks(displayedTasks.concat([result]))
    })
  })

  //setDisplayedTasks(displayedTasks.concat([{ name: "1", description: "2", id: "45" }]))

  let renderTask = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: "#d8d8d8",
          justifyContent: "center",
          alignItems: "center",
          width: childrenWidth - childrenSpacing * 2,
          height: childrenHeight - childrenSpacing,
          marginLeft: childrenSpacing
        }}
      >
        <Text>{item.name}</Text>
      </View>
    )
  }

  let myScrollView = null

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ScrollView
        ref={(scrollView) => myScrollView = scrollView}
        scrollEnabled={scrollEnabled}
        style={{
          paddingTop: 5
        }}
      >
        <DragSortableView
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          dataSource={displayedTasks}
          sortable={true}
          childrenHeight={childrenHeight}
          childrenWidth={childrenWidth}
          parentWidth={parentWidth}
          renderItem={(item, index) => {
            return renderTask(item, index)
          }}
          scaleStatus={'scaleY'}
          onDragStart={(startIndex, endIndex) => {
            setScrollEnabled(false)
          }}
          onDragEnd={(startIndex) => {
            setScrollEnabled(true)
          }}
          onDataChange={(data) => {

          }}
          keyExtractor={(item, index) => item.txt} // FlatList作用一样，优化
          onClickItem={(data, item, index) => { }}
        >
        </DragSortableView>
      </ScrollView>
    </SafeAreaView>
  )

}