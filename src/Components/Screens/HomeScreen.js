import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

import Constants from "expo-constants"

import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

//impory Slidy
import Slidy from "../Slidy/Slidy.js"

//import dayListView
import DayListView from "../DayListView/DayListView.js"
import EditTaskWindow from '../EditTaskWindow/EditTaskWindow.js'
import SaveDayListToCache from '../../DayList/SaveDayListToCache.js'
import GetDayListFromCache from "../../DayList/GetDayListFromCache.js"


export default (props) => {

  const [selectedDayList, setSelectedDayList] = useState(null)

  //import dayList from cache
  if (selectedDayList == null) {
    console.log(Date.now)
    GetDayListFromCache(Date.now).then((value) => {
      if (value == undefined) {
        setSelectedDayList({
          day: Date.now,
          realTaskIDs: []
        })
        SaveDayListToCache(selectedDayList)
      }
      else {
        setSelectedDayList(value)
      }
    })

  }


  const [addTaskPopup, setAddTaskPopup] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <EditTaskWindow
        visible={addTaskPopup}
        onClose={(newVal) => { setAddTaskPopup(newVal) }}
        selectedDayList={selectedDayList}
        onNewTaskReady={() => {
          setSelectedDayList({ ...selectedDayList })//set to shallow copy to force rerender  
        }}
        task={selectedTask}
      />
      <View style={{ flex: 1 }}>
        <Slidy>
          <View style={{ flex: 1 }}>
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
                  <Text style={{ fontSize: 15 }}>Schedule for </Text>
                  <Text style={{ fontSize: 15 }}>Today</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                  <TouchableWithoutFeedback onPress={() => {
                    setAddTaskPopup(true)
                    setSelectedTask(null)
                  }}>
                    <Ionicons name="add" size={35} color="gray" />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <DayListView
                dayList={selectedDayList}
                onTaskClicked={(task) => {
                  setSelectedTask(task)
                  setAddTaskPopup(true)
                }}
              />
            </View>
          </View>

        </Slidy>
      </View>

    </View >
  )

}
