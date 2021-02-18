import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

import WeekListView from "./WeekListView.js"
import Header from "../../Headers/MultipurposeAddHeader.js"
import GetAllDaysThisWeek from "../../../Functions/WeekList/GetAllDaysThisWeek.js"

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
      <Header
        text={headerLabel}
        onPlusButton={() => {
          setAddTaskPopup(true)
          setSelectedTask(null)
        }} />
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
          onTaskClicked={(task, day) => {
            setSelectedTask(task, day)
            setAddTaskPopup(true)
          }} />
      </View>
    </View>
  )
}