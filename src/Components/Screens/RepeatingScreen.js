import * as React from "react"
import { useState } from "react"
import { FlatList, Dimensions, SafeAreaView, View } from "react-native";
import Header from "../Headers/MultipurposeAddHeader.js"
import Constants from "expo-constants"

import EditTaskWindow from "../EditTaskWindow/EditTaskWindow.js"
import TaskListView from "../Tasks/TaskListView.js"

export default () => {
  const [repeatingTasks, setRepeatingTasks] = useState([])
  const [addTaskPopup, setAddTaskPopup] = useState(false)

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
        task={null}
        day={null}
        addNewTask={(task, selectedDay) => {
          setRepeatingTasks([...repeatingTasks, task])
          console.log(repeatingTasks)
        }}
      />
      <Header
        text={"Repeating Tasks"}
        onPlusButton={() => {
          setAddTaskPopup(true)
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