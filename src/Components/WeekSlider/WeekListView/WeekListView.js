import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight, ScrollView } from "react-native"

import Constants from "expo-constants"

import { useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import getDayToday from "../../../Functions/DayList/GetDayToday.js"



//import dayListView
import DayListView from "./DayListView.js"
import GetAllDays from '../../../Functions/WeekList/GetAllDays.js'
import SaveDayListToCache from '../../../Functions/DayList/SaveDayListToCache.js'
import GetDayListFromCache from "../../../Functions/DayList/GetDayListFromCache.js"

//selectedWeek is a list of days in the week
export default ({
  mondayDayList,
  tuesdayDayList,
  wednesdayDayList,
  thursdayDayList,
  fridayDayList,
  saturdayDayList,
  sundayDayList,
  onTaskClicked,
  onFinishedLoadingWeek
}) => {

  const [addTaskPopup, setAddTaskPopup] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)

  //onFinishedLoadingWeek must be called when all constituant days have recently loaded
  //a list of variables to track if each day has recently loaded
  var mondayRecentlyLoaded = false
  var tuesdayRecentlyLoaded = false
  var wednesdayRecentlyLoaded = false
  var thursdayRecentlyLoaded = false
  var fridayRecentlyLoaded = false
  var saturdayRecentlyLoaded = false
  var sundayRecentlyLoaded = false
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
    //only runs if all previous conditions are not met
    onFinishedLoadingWeek()
  }

  //check if none of the days have anything
  if (
    (mondayDayList == null || mondayDayList.realTaskIDs == 0) &&
    (tuesdayDayList == null || tuesdayDayList.realTaskIDs == 0) &&
    (wednesdayDayList == null || wednesdayDayList.realTaskIDs == 0) &&
    (thursdayDayList == null || thursdayDayList.realTaskIDs == 0) &&
    (fridayDayList == null || fridayDayList.realTaskIDs == 0) &&
    (saturdayDayList == null || saturdayDayList.realTaskIDs == 0) &&
    (sundayDayList == null || sundayDayList.realTaskIDs == 0)
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
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      mondayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
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
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      tuesdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
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
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      wednesdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
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
                    scrollEnabled={false}
                    onFinishedLoadingTasks={onFinishedLoadingTasks}
                    onFinishedLoadingTasks={() => {
                      thursdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
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
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      fridayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
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
                    dayList={saturdayDayList}
                    onTaskClicked={(task) => {
                      onTaskClicked(task, "saturday")
                    }}
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      saturdayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
                  />
                </View>
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
                    scrollEnabled={false}
                    onFinishedLoadingTasks={() => {
                      sundayRecentlyLoaded = true
                      dayRecentlyLoaded()
                    }}
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