import *  as React from 'react';
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native"
import { useState } from "react"
import Constants from "expo-constants"



//impory WeekSlider 
import WeekSlider from "../WeekSlider/WeekSlider.js"

import EditTaskWindow from '../EditTaskWindow/EditTaskWindow.js'
import SaveDayListToCache from '../../Functions/DayList/SaveDayListToCache.js'
import GetDayListFromCache from "../../Functions/DayList/GetDayListFromCache.js"
import GetAllDaysThisWeek from "../../Functions/WeekList/GetAllDaysThisWeek.js"
import GetAllDays from "../../Functions/WeekList/GetAllDays.js"


export default (props) => {
  //hooks glorious hooks
  //setup hooks for the home screen
  const [addTaskPopup, setAddTaskPopup] = useState(false)

  const [selectedTask, setSelectedTask] = useState(null)

  //IMPORTANT: The current week, the preceeding week and the next week are all loaded
  //a once. 

  //list of timestamps for the week
  const [selectedWeek, setSelectedWeek] = useState(GetAllDaysThisWeek())
  //a wee bit of date manipulation
  const nextMonday = new Date(selectedWeek[0])
  nextMonday.setDate(nextMonday.getDate() + 7)
  const previousMonday = new Date(selectedWeek[0])
  previousMonday.setDate(previousMonday.getDate() - 7)
  const [nextWeek, setNextWeek] = useState(GetAllDays(nextMonday.getTime()))
  const [previousWeek, setPreviousWeek] = useState(GetAllDays(previousMonday.getTime()))

  //these are the component dayLists for the WeekListView.
  //they have to be done here to be passed to the EditTaskWindow
  //they have to be in the clossest common relative of the 
  //EditTaskWindow and the WeekListView

  //slectedDayLists holds the daylists for each day of the selected week 
  const [selectedDayLists, setSelectedDayLists] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  })
  const [nextWeekDayLists, setNextWeekDayLists] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  })
  const [previousWeekDayLists, setPreviousWeekDayLists] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
  })
  const [startedLoading, setStartedLoading] = useState(false)//used to controll loading of dayLists
  //over many reloads

  //import the dayLists
  //lots of rerenders here lets see if this works
  if (!startedLoading) {
    loadDayLists(selectedDayLists, (value) => { setSelectedDayLists(value) },
      (value) => { setStartedLoading(value) }, selectedWeek)
    loadDayLists(nextWeekDayLists, (value) => { setNextWeekDayLists(value) },
      (value) => { setStartedLoading(value) }, nextWeek)
    loadDayLists(previousWeekDayLists, (value) => { setPreviousWeekDayLists(value) },
      (value) => { setStartedLoading(value) }, previousWeek)
  }

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <EditTaskWindow
        visible={addTaskPopup}
        onClose={(newVal) => { setAddTaskPopup(newVal) }}

        selectedDayLists={selectedDayLists}
        onNewTaskReady={() => {
          setSelectedDayLists({ ...selectedDayLists })
        }}
        task={selectedTask}
      />
      <View style={{ flex: 1 }}>

        <WeekSlider
          selectedDayLists={selectedDayLists}
          previousDayLists={previousWeekDayLists}
          nextDayLists={nextWeekDayLists}

          setAddTaskPopup={(item) => { setAddTaskPopup(item) }}
          setSelectedTask={(item) => { setSelectedTask(item) }}

          moveWeekBack1={(callback) => {
            //sort out weeks
            const previousMonday = new Date(previousWeek[0])
            previousMonday.setDate(previousMonday.getDate() - 7)
            const newPreviousWeek = GetAllDays(previousMonday.getTime())
            //week shift
            setNextWeek(selectedWeek)
            setSelectedWeek(previousWeek)
            setPreviousWeek(newPreviousWeek)
            //now reloacte dayLists
            const oldSelectedDayLists = selectedDayLists
            setSelectedDayLists(previousWeekDayLists)
            callback(oldSelectedDayLists)
          }}
          moveWeekBack2={(oldSelectedDayLists) => {
            //sort out weeks
            const previousMonday = new Date(previousWeek[0])
            previousMonday.setDate(previousMonday.getDate() - 7)
            const newPreviousWeek = GetAllDays(previousMonday.getTime())
            setPreviousWeekDayLists({
              monday: null,
              tuesday: null,
              wednesday: null,
              thursday: null,
              friday: null,
              saturday: null,
              sunday: null
            })
            loadDayLists(newPreviousWeek, (value) => { setPreviousWeekDayLists(value) },
              (value) => { setStartedLoading(value) }, previousWeek)

            setNextWeekDayLists(oldSelectedDayLists)
          }
          }
          moveWeekForward1={(callback) => {
            //sort out weeks
            const nextMonday = new Date(nextWeek[0])
            nextMonday.setDate(nextMonday.getDate() + 7)
            const newNextWeek = GetAllDays(nextMonday.getTime())
            //week shift
            setPreviousWeek(selectedWeek)
            setSelectedWeek(nextWeek)
            setNextWeek(newNextWeek)
            //now reloacte dayLists
            const oldSelectedDayLists = selectedDayLists
            setSelectedDayLists(nextWeekDayLists)
            callback(oldSelectedDayLists)
          }}
          moveWeekForward2={(oldSelectedDayLists) => {
            const nextMonday = new Date(nextWeek[0])
            nextMonday.setDate(nextMonday.getDate() + 7)
            const newNextWeek = GetAllDays(nextMonday.getTime())
            setNextWeekDayLists({
              monday: null,
              tuesday: null,
              wednesday: null,
              thursday: null,
              friday: null,
              saturday: null,
              sunday: null
            })
            loadDayLists(newNextWeek, (value) => { setNextWeekDayLists(value) },
              (value) => { setStartedLoading(value) }, newNextWeek)

            setPreviousWeekDayLists(oldSelectedDayLists)
          }}
        />


      </View>

    </View >
  )


}

//a function to asyncrinously load a week of dayLists
const loadDayLists = (dayLists, setDayLists, setStartedLoading, theWeek) => {
  //this function only runs if startedLoading==false
  let myPromises = []

  myPromises.push(GetDayListFromCache(theWeek[0]))
  myPromises.push(GetDayListFromCache(theWeek[1]))
  myPromises.push(GetDayListFromCache(theWeek[2]))
  myPromises.push(GetDayListFromCache(theWeek[3]))
  myPromises.push(GetDayListFromCache(theWeek[4]))
  myPromises.push(GetDayListFromCache(theWeek[5]))
  myPromises.push(GetDayListFromCache(theWeek[6]))

  Promise.all(myPromises).then((values) => {
    let newValues = []
    for (let i = 0; i < 7; i++) {
      let newVal = values[i]
      if (newVal == undefined) {
        newVal = {
          day: theWeek[i],
          realTaskIDs: []
        }
        SaveDayListToCache(newVal)
      }
      newValues.push(newVal)
    }
    setDayLists({
      monday: newValues[0],
      tuesday: newValues[1],
      wednesday: newValues[2],
      thursday: newValues[3],
      friday: newValues[4],
      saturday: newValues[5],
      sunday: newValues[6]
    })
    setStartedLoading(true)
  })
}