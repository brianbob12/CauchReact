import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

import WeekListView from "../WeekListView/WeekListView.js"
import GetAllDaysThisWeek from "../../Functions/WeekList/GetAllDaysThisWeek.js"
import { Ionicons } from '@expo/vector-icons'

export default ({ dayLists, setAddTaskPopup, setSelectedTask }) => {
  //determine the label at the top of the header
  var headerLabel = "Week Starting "
  if (dayLists.monday == null) {
    //the dayList is till loading
    headerLabel = "This Week"
  }
  else {
    const thisMonday = GetAllDaysThisWeek()[0]
    const nextMonday = new Date(thisMonday)
    nextMonday.setDate(nextMonday.getDate() + 7)
    const previousMonday = new Date(thisMonday)
    previousMonday.setDate(previousMonday.getDate() - 7)
    if (dayLists.monday.day == thisMonday) {
      headerLabel = "This Week"
    }
    else if (dayLists.monday.day == nextMonday.getTime()) {
      headerLabel = "Next Week"
    }
    else if (dayLists.monday.day == previousMonday.getTime()) {
      headerLabel = "Last Week"
    }
    else {
      const dateForm = new Date(dayLists.monday.day)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const num = dateForm.getDate()
      headerLabel += num
      if (num > 3) {
        headerLabel += "th"
      }
      else if (num == 3) {
        headerLabel += "rd"
      }
      else if (num == 2) {
        headerLabel += "nd"
      }
      else if (num == 1) {
        headerLabel += "st"
      }

      headerLabel += " " + months[dateForm.getMonth()]

    }
  }
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

            <Text style={{ fontSize: 15 }}>{headerLabel}</Text>
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
          mondayDayList={dayLists.monday}
          tuesdayDayList={dayLists.tuesday}
          wednesdayDayList={dayLists.wednesday}
          thursdayDayList={dayLists.thursday}
          fridayDayList={dayLists.friday}
          saturdayDayList={dayLists.saturday}
          sundayDayList={dayLists.sunday}
          onTaskClicked={(task) => {
            setSelectedTask(task)
            setAddTaskPopup(true)
          }} />
      </View>
    </View>
  )
}