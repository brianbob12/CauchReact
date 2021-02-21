import * as React from "react"
import { useState } from "react"
import { FlatList, StyleSheet, SafeAreaView, View } from "react-native";
import Header from "../Headers/MultipurposeAddHeader.js"
import Constants from "expo-constants"

import EditTaskWindow from "../EditTaskWindow/EditTaskWindow.js"

export default () => {
  var repeatingTasks = []
  var [addTaskPopup, setAddTaskPopup] = useState(false)

  let renderTask = ({ item }) => {
    return (

      <View style={{ width: Dimensions.get("window").width, padding: 5, justifyContent: "center", alignItems: "center" }}>
        <TaskListView task={item} onClick={(task) => { onTaskClicked(task) }} onDeleteTask={(task) => { deleteTask(task) }} />
      </View>


    )
  }
  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <EditTaskWindow
        visible={addTaskPopup}
        onClose={(newVal) => { setAddTaskPopup(newVal) }}
        onNewTaskReady={() => {
          //update something
        }}
        task={null}
        day={null}
      />
      <Header
        text={"Repeating Tasks"}
        onPlusButton={() => {

        }}
      />
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={repeatingTasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
          />
        </SafeAreaView>
      </View>
    </View>
  )
}