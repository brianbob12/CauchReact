import *  as React from 'react';

import WebWindow from './WebWindow'
import NonWebWindow from "./NonWebWindow"

import SaveTaskToCache from "../Tasks/Caching/SaveTaskToCache"
import SaveDayListToCahce from '../DayList/SaveDayListToCahce';

export default (props) => {
  let addNewTask = (task, dayList) => {
    task.id = Math.random().toString(32)
    SaveTaskToCache(task).then(props.onNewTaskReady)

    dayList.realTaskIDs.push(task.id)
    let PB = SaveDayListToCahce(dayList)
  }
  if (typeof document != "undefined") {
    return (
      <WebWindow visible={props.visible} />
    )
  }
  else {
    return (
      <NonWebWindow visible={props.visible} onClose={(visible, task) => {
        //task is null if process was cancelled
        if (task != null) { addNewTask(task, props.selectedDayList) }
        props.onClose(visible)
      }
      } />
    )
  }
}



