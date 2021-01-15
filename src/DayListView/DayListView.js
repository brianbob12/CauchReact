import *  as React from 'react'
import { useState } from 'react'

import { Dimensions, StyleSheet, SafeAreaView, Text, View, FlatList, StatusBar, Alert } from "react-native"

import Constants from 'expo-constants'
//shows a drag and drop list of all tasks in a given dayList
//must be in a SafeAreaView

//TEMPORARY
import SaveTaskToCache from "../Tasks/Caching/SaveTaskToCache.js"
import GetTaskFromCache from "../Tasks/Caching/GetTaskFromCache.js"
import TaskListView from '../Tasks/TaskListView.js'
import SaveDayListToCache from '../DayList/SaveDayListToCache.js'

//setup variables
const { width } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width
const childrenHeight = 48
const childrenSpacing = 8

export default ({ dayList, onTaskClicked }) => {

  if (dayList == null) {
    dayList = { realTaskIDs: [] }
  }

  //hooks
  let [displayedTasks, setDisplayedTasks] = useState([])


  //not hooks
  let renderTask = ({ item }) => {
    return (

      <View style={{ width: Dimensions.get("window").width, padding: 5, justifyContent: "center", alignItems: "center" }}>
        <TaskListView task={item} onClick={onTaskClicked} onDeleteTask={(task) => { deleteTask(task) }} />
      </View>


    )
  }
  let deleteTask = (task) => {
    Alert.alert(
      "Confirm Delete Task",
      task.name,
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            //remove task from daylist and then force a rerender

            let index = dayList.realTaskIDs.findIndex((element) => element == task.id)
            dayList.realTaskIDs.splice(index, 1)
            //TODO remove task from cache

            //save dayList
            SaveDayListToCache(dayList)

            //update displayedTasks and force a rerender
            let displayedTasksCopy = [...displayedTasks]//shallow copy
            displayedTasksCopy.splice(index, 1)
            setDisplayedTasks(displayedTasksCopy)
          },
        }
      ],
      { cancelable: false }
    )
  }
  //other stuff
  //check if the displayedTasks is up to date
  let same = true
  if (displayedTasks.length == dayList.realTaskIDs.length) {
    //old school iteration
    for (let i = 0; i < displayedTasks.length; i++) {
      if (displayedTasks[i].id == dayList.realTaskIDs[i]) {
        continue
      }
      else {
        same = false
        break
      }
    }
  }
  else {
    same = false
  }
  if (!same) {
    const myPromises = []
    dayList.realTaskIDs.forEach((taskID) => {
      //TODO check if already loaded
      myPromises.push(GetTaskFromCache(taskID))
    })
    Promise.all(myPromises).then((values) => {
      setDisplayedTasks(values)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayedTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})