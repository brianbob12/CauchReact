import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

import WeekListView from "../WeekListView/WeekListView.js"
import { Ionicons } from '@expo/vector-icons'

import Constants from "expo-constants"

import { useState } from 'react'

export default ({ mondayDayList, tuesdayDayList, wednesdayDayList, thursdayDayList,
  fridayDayList, saturdayDayList, sundayDayList, setAddTaskPopup, setSelectedTask }) => {
  return (
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
            <Text style={{ fontSize: 15 }}>This Week</Text>
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
        <WeekListView
          mondayDayList={mondayDayList}
          tuesdayDayList={tuesdayDayList}
          wednesdayDayList={wednesdayDayList}
          thursdayDayList={thursdayDayList}
          fridayDayList={fridayDayList}
          saturdayDayList={saturdayDayList}
          sundayDayList={sundayDayList}
          onTaskClicked={(task) => {
            setSelectedTask(task)
            setAddTaskPopup(true)
          }} />
      </View>
    </View>
  )
}