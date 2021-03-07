import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight, ScrollView } from "react-native"

//       WARNING
// BAD VARIABLE NAMES AHEAD
//   PROCEED WITH NOTEBOOK



import Constants from "expo-constants"

import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import getDayToday from "../../../Functions/DayList/GetDayToday.js"

import SaveDoneListToCache from "../../../Functions/DayList/SaveDoneListToCache.js"

//import dayListView
import DayListView from "./DayListView.js"
import GetAllDays from '../../../Functions/WeekList/GetAllDays.js'
import SaveDayListToCache from '../../../Functions/DayList/SaveDayListToCache.js'
import GetDayListFromCache from "../../../Functions/DayList/GetDayListFromCache.js"
import SaveTaskToCache from '../../../Functions/Tasks/Caching/SaveTaskToCache.js';

//selectedWeek is a list of days in the week
export default ({
  mondayDayList,
  tuesdayDayList,
  wednesdayDayList,
  thursdayDayList,
  fridayDayList,
  saturdayDayList,
  sundayDayList,
  doneDayList,
  onTaskClicked,
  onFinishedLoadingWeek
}) => {

  const [addTaskPopup, setAddTaskPopup] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)

  //used as a hackey way to force a rerender
  const [counter, setCounter] = useState(0)

  //onFinishedLoadingWeek must be called when all constituant days have recently loaded
  //a list of variables to track if each day has recently loaded
  var mondayRecentlyLoaded = false
  var tuesdayRecentlyLoaded = false
  var wednesdayRecentlyLoaded = false
  var thursdayRecentlyLoaded = false
  var fridayRecentlyLoaded = false
  var saturdayRecentlyLoaded = false
  var sundayRecentlyLoaded = false
  var doneRecentlyLoaded = false
  //this function runs when any day has finished loading it's tasks
  const dayRecentlyLoaded = () => {
    //checks if all days(that have tasks) have recently loaded
    if (mondayDayList.realTaskIDs.length > 0 && !mondayRecentlyLoaded) { return ({}) }
    if (tuesdayDayList.realTaskIDs.length > 0 && !tuesdayRecentlyLoaded) { return ({}) }
    if (wednesdayDayList.realTaskIDs.length > 0 && !wednesdayRecentlyLoaded) { return ({}) }
    if (thursdayDayList.realTaskIDs.length > 0 && !thursdayRecentlyLoaded) { return ({}) }
    if (fridayDayList.realTaskIDs.length > 0 && !fridayRecentlyLoaded) { return ({}) }
    if (saturdayDayList.realTaskIDs.length > 0 && !saturdayRecentlyLoaded) { return ({}) }
    if (sundayDayList.realTaskIDs.length > 0 && !sundayRecentlyLoaded) { return ({}) }
    if (doneDayList.realTaskIDs.length > 0 && !doneRecentlyLoaded) { return ({}) }
    //only runs if all previous conditions are not met
    onFinishedLoadingWeek()
  }
  //runs when a task is checked
  const onTaskChecked = (task, dayList) => {
    //make sure the task has a day refrence
    //this is for if it is unchecked
    task.day = dayList.day
    SaveTaskToCache(task)

    //add task to done
    doneDayList.realTaskIDs.push(task.id)
    //save doneDayList
    SaveDoneListToCache(doneDayList)
    //TODO force rerender
    //remove task from dayList
    let index = dayList.realTaskIDs.findIndex((element) => element == task.id)
    dayList.realTaskIDs.splice(index, 1)
    SaveDayListToCache(dayList)
    //force rerender
    setCounter(counter + 1)
  }

  const onCompletedTaskChecked = (task) => {
    //add the task back to the day it was in previously
    if (task.day == undefined) {
      //this shouldn't happen
      console.log("undefined day when unchecking task")
      //do monday
      return
    }
    if (task.day === mondayDayList.day) {
      mondayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(mondayDayList)
    }
    else if (task.day === tuesdayDayList.day) {
      tuesdayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(tuesdayDayList)
    }
    else if (task.day === wednesdayDayList.day) {
      wednesdayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(wednesdayDayList)
    }
    else if (task.day === thursdayDayList.day) {
      thursdayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(thursdayDayList)
    }
    else if (task.day === fridayDayList.day) {
      fridayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(fridayDayList)
    }
    else if (task.day === saturdayDayList.day) {
      saturdayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(saturdayDayList)
    }
    else if (task.day === sundayDayList.day) {
      sundayDayList.realTaskIDs.push(task.id)
      SaveDayListToCache(sundayDayList)
    }
    //remove task from checked list
    let index = doneDayList.realTaskIDs.findIndex((element) => element == task.id)
    doneDayList.realTaskIDs.splice(index, 1)
    SaveDoneListToCache(doneDayList)
    //force rerender
    setCounter(counter + 1)
  }

  //check if none of the days have anything
  if (
    (mondayDayList == null || mondayDayList.realTaskIDs.length == 0) &&
    (tuesdayDayList == null || tuesdayDayList.realTaskIDs.length == 0) &&
    (wednesdayDayList == null || wednesdayDayList.realTaskIDs.length == 0) &&
    (thursdayDayList == null || thursdayDayList.realTaskIDs.length == 0) &&
    (fridayDayList == null || fridayDayList.realTaskIDs.length == 0) &&
    (saturdayDayList == null || saturdayDayList.realTaskIDs.length == 0) &&
    (sundayDayList == null || sundayDayList.realTaskIDs.length == 0) &&
    (doneDayList == null || doneDayList.realTaskIDs.length == 0)
  ) {
    //no tasks
    //bit of a hack but I need a small delay here
    setTimeout(onFinishedLoadingWeek, 10)
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {mondayDayList != null &&
            <View style={{ flex: 1 }}>
              {mondayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayTextStyle}>Monday</Text>
                  <DayListView
                    dayList={mondayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "monday")
                    }}
                    onTaskChecked={(task) => onTaskChecked(task, mondayDayList)}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      mondayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {tuesdayDayList != null &&
            <View style={{ flex: 1 }}>
              {tuesdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayTextStyle}>Tuesday</Text>
                  <DayListView
                    dayList={tuesdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "tuesday")
                    }}
                    onTaskChecked={(task) => onTaskChecked(task, tuesdayDayList)}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      tuesdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {wednesdayDayList != null &&
            <View style={{ flex: 1 }}>
              {wednesdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayTextStyle}>Wednesday</Text>
                  <DayListView
                    dayList={wednesdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "wednesday")
                    }}
                    onTaskChecked={(task) => { onTaskChecked(task, wednesdayDayList) }}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      wednesdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {thursdayDayList != null &&
            <View style={{ flex: 1 }}>
              {thursdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayTextStyle}>Thursday</Text>
                  <DayListView
                    dayList={thursdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "thursday")
                    }}
                    onTaskChecked={(task) => { onTaskChecked(task, thursdayDayList) }}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      thursdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {fridayDayList != null &&
            <View style={{ flex: 1 }}>
              {fridayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayTextStyle}>Friday</Text>
                  <DayListView
                    dayList={fridayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "friday")
                    }}
                    onTaskChecked={(task) => { onTaskChecked(task, fridayDayList) }}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      fridayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {saturdayDayList != null &&
            <View style={{ flex: 1 }}>
              {saturdayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.dayTextStyle}>Saturday</Text>
                  <DayListView
                    dayList={saturdayDayList} onTaskClicked={(task) => {
                      onTaskClicked(task, "saturday")
                    }}
                    onTaskChecked={(task) => { onTaskChecked(task, saturdayDayList) }} scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      saturdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }} tasksCompleted={false} /> </View>
              }
            </View>
          }
        </View>
        <View>
          {sundayDayList != null &&
            <View style={{ flex: 1 }}>
              {sundayDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
                  <Text style={styles.dayTextStyle}>Sunday</Text>
                  <DayListView
                    dayList={sundayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "sunday")
                    }}
                    onTaskChecked={(task) => { onTaskChecked(task, sundayDayList) }}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      sundayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={false}
                  />
                </View>
              }
            </View>
          }
        </View>
        <View>
          {doneDayList != null &&
            <View style={{ flex: 1 }}>
              {doneDayList.realTaskIDs.length > 0 &&
                <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
                  <Text style={styles.dayTextStyle}>Completed</Text>
                  <DayListView
                    dayList={doneDayList}
                    onTaskClicked={(task) => { }}//tasks in this area cannot be clicked
                    onTaskChecked={(task) => { onCompletedTaskChecked(task) }}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      doneRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                    tasksCompleted={true}
                  />
                </View>
              }
            </View>
          }
        </View>
      </ScrollView>
    </View>

  )

}

const styles = StyleSheet.create({
  dayTextStyle: {
    padding: 5
  }
})