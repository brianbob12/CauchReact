import *  as React from 'react'
import { useState } from 'react'

import { Dimensions, StyleSheet, SafeAreaView, Text, View, FlatList, StatusBar } from "react-native"

import Constants from 'expo-constants'
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
  let [displayedTasks, setDisplayedTasks] = useState([])


  //not hooks

  //other stuff
  //bit of a hack here but it works. 
  //TODO find the proper way of preventing a parent rerender. 
  if (displayedTasks.length < props.dayList.realTaskIDs.length)
    props.dayList.realTaskIDs.forEach((taskID) => {
      GetTaskFromCache(taskID).then((value) => {
        setDisplayedTasks(displayedTasks.concat([value]))
      })
    })

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
let renderTask = ({ item }) => {
  return (

    <View style={{ width: Dimensions.get("window").width, padding: 15, justifyContent: "center", alignItems: "center" }}>
      <Text>{item.name}</Text>
    </View>


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