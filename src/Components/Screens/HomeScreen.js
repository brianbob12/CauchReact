import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"

import Constants from "expo-constants"

import { useState } from 'react'

import getDayToday from "../../Functions/DayList/GetDayToday.js"

//impory Slidy
import WeekSlider from "../Slidy/Slidy.js"

import WeekListViewWithHeader from "../WeekListViewWithHeader/WeekListViewWithHeader.js"
import EditTaskWindow from '../EditTaskWindow/EditTaskWindow.js'
import SaveDayListToCache from '../../Functions/DayList/SaveDayListToCache.js'
import GetDayListFromCache from "../../Functions/DayList/GetDayListFromCache.js"
import GetAllDaysThisWeek from "../../Functions/WeekList/GetAllDaysThisWeek.js"

export default (props) => {
  //hooks glorious hooks
  //setup hooks for the home screen
  const [addTaskPopup, setAddTaskPopup] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)


  //list of timestamps for the week
  const [selectedWeek, setSelectedWeek] = useState(GetAllDaysThisWeek)

  //these are the component dayLists for the WeekListView.
  //they have to be done here to be passed to the EditTaskWindow
  //they have to be in the clossest common relative of the 
  //EditTaskWindow and the WeekListView
  const [mondayDayList, setMondayDayList] = useState(null)
  const [tuesdayDayList, setTuesdayDayList] = useState(null)
  const [wednesdayDayList, setWednesdayDayList] = useState(null)
  const [thursdayDayList, setThursdayDayList] = useState(null)
  const [fridayDayList, setFridayDayList] = useState(null)
  const [saturdayDayList, setSaturdayDayList] = useState(null)
  const [sundayDayList, setSundayDayList] = useState(null)

  //import the dayLists
  //lots of rerenders here lets see if this works
  //this is not in a function because the hooks have to run in this scope. 
  //Converting this repeated process to a function would require a callbac
  if (mondayDayList == null) {
    GetDayListFromCache(selectedWeek[0]).then((value) => {
      if (value == undefined) {
        setMondayDayList({
          day: selectedWeek[0],
          realTaskIDs: []
        })
        SaveDayListToCache(mondayDayList)
      }
      else {
        setMondayDayList(value)
      }
    })

  }
  if (tuesdayDayList == null) {
    GetDayListFromCache(selectedWeek[1]).then((value) => {
      if (value == undefined) {
        setTuesdayDayList({
          day: selectedWeek[1],
          realTaskIDs: []
        })
        SaveDayListToCache(tuesdayDayList)
      }
      else {
        setTuesdayDayList(value)
      }
    })

  }
  if (wednesdayDayList == null) {
    GetDayListFromCache(selectedWeek[2]).then((value) => {
      if (value == undefined) {
        setWednesdayDayList({
          day: selectedWeek[2],
          realTaskIDs: []
        })
        SaveDayListToCache(wednesdayDayList)
      }
      else {
        setWednesdayDayList(value)
      }
    })

  }
  if (thursdayDayList == null) {
    GetDayListFromCache(selectedWeek[3]).then((value) => {
      if (value == undefined) {
        setThursdayDayList({
          day: selectedWeek[3],
          realTaskIDs: []
        })
        SaveDayListToCache(wednesdayDayList)
      }
      else {
        setThursdayDayList(value)
      }
    })

  }
  if (fridayDayList == null) {
    GetDayListFromCache(selectedWeek[4]).then((value) => {
      if (value == undefined) {
        setFridayDayList({
          day: selectedWeek[4],
          realTaskIDs: []
        })
        SaveDayListToCache(fridayDayList)
      }
      else {
        setFridayDayList(value)
      }
    })

  }
  if (saturdayDayList == null) {
    GetDayListFromCache(selectedWeek[5]).then((value) => {
      if (value == undefined) {
        setSaturdayDayList({
          day: selectedWeek[5],
          realTaskIDs: []
        })
        SaveDayListToCache(saturdayDayList)
      }
      else {
        setSaturdayDayList(value)
      }
    })

  }
  if (sundayDayList == null) {
    GetDayListFromCache(selectedWeek[6]).then((value) => {
      if (value == undefined) {
        setSundayDayList({
          day: selectedWeek[6],
          realTaskIDs: []
        })
        SaveDayListToCache(sundayDayList)
      }
      else {
        setSundayDayList(value)
      }
    })

  }



  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <EditTaskWindow
        visible={addTaskPopup}
        onClose={(newVal) => { setAddTaskPopup(newVal) }}
        mondayDayList={mondayDayList}
        tuesdayDayList={tuesdayDayList}
        wednesdayDayList={wednesdayDayList}
        thursdayDayList={thursdayDayList}
        fridayDayList={fridayDayList}
        saturdayDayList={saturdayDayList}
        sundayDayList={sundayDayList}
        onNewTaskReady={(selectedDay) => {
          if (selectedDay == "monday") {
            setMondayDayList({ ...mondayDayList })//set to shallow copy to force rerender  
          }
          else if (selectedDay == "tuesday") {
            setTuesdayDayList({ ...tuesdayDayList })//set to shallow copy to force rerender  
          }
          else if (selectedDay == "wednesday") {
            setWednesdayDayList({ ...wednesdayDayList })//set to shallow copy to force rerender  
          }
          else if (selectedDay == "thurday") {
            setThursdayDayList({ ...thursdayDayList })//set to shallow copy to force rerender  
          }
          else if (selectedDay == "friday") {
            setFridayDayList({ ...fridayDayList })//set to shallow copy to force rerender  
          }
          else if (selectedDay == "saturday") {
            setSaturdayDayList({ ...saturdayDayList })//set to shallow copy to force rerender  
          }
          else if (selectedDay == "sunday") {
            setSundayDayList({ ...sundayDayList })//set to shallow copy to force rerender  
          }
        }}
        task={selectedTask}
      />
      <View style={{ flex: 1 }}>

        <WeekSlider
          mondayDayList={mondayDayList}
          tuesdayDayList={tuesdayDayList}
          wednesdayDayList={wednesdayDayList}
          thursdayDayList={thursdayDayList}
          fridayDayList={fridayDayList}
          saturdayDayList={saturdayDayList}
          sundayDayList={sundayDayList}
          setAddTaskPopup={(item) => { setAddTaskPopup(item) }}
          setSelectedTask={(item) => { setSelectedTask(item) }}
        />


      </View>

    </View >
  )

}
