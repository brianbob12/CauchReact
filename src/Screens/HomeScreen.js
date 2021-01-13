import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

import Constants from "expo-constants"

import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

//impory Slidy
import Slidy from "../Slidy/Slidy.js"

//import dayListView
import DayListView from "../DayListView/DayListView.js"
import AddNewTaskWindow from '../AddNewTaskWindow/AddNewTaskWindow.js';
import SaveDayListToCahce from '../DayList/SaveDayListToCahce.js';


export default (props) => {

  const [selectedDayList, setSelectedDayList] = useState({
    day: Date.now,
    realTaskIDs: []
  })
  SaveDayListToCahce(selectedDayList)

  const [addTaskPopup, setAddTaskPopup] = useState(false)

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <AddNewTaskWindow
        visible={addTaskPopup}
        onClose={(newVal) => { setAddTaskPopup(newVal) }}
        selectedDayList={selectedDayList}
        onNewTaskReady={() => {
          setSelectedDayList({ ...selectedDayList })//set to shallow copy to force rerender  
        }}
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
                <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
                  <Text>Schedule for </Text><Text>Today</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                  <TouchableWithoutFeedback onPress={() => {
                    setAddTaskPopup(true)
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
              <DayListView dayList={selectedDayList} />
            </View>
          </View>

        </Slidy>
      </View>

    </View >
  )

}
