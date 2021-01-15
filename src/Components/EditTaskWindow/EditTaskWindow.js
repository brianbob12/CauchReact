import *  as React from 'react';

import WebWindow from './WebWindow'
import NonWebWindow from "./NonWebWindow"

import SaveTaskToCache from "../../Tasks/Caching/SaveTaskToCache"
import SaveDayListToCahce from '../../DayList/SaveDayListToCache';

export default ({ visible, selectedDayList, onNewTaskReady, task, onClose }) => {
  let addNewTask = (task, dayList) => {
    if (task.id == undefined || task.id == null) {
      task.id = Math.random().toString(32)
    }
    SaveTaskToCache(task).then(onNewTaskReady)

    if (!dayList.realTaskIDs.includes(task.id)) {
      dayList.realTaskIDs.push(task.id)
    }
    SaveDayListToCahce(dayList)
  }
  let myTask = task
  if (task == null || task == undefined) {
    myTask = {
      name: "New Task",
      description: "Description Of Task"
    }
  }
  if (typeof document != "undefined") {
    return (
      <WebWindow visible={visible} />
    )
  }
  else {
    return (
      <NonWebWindow
        visible={visible}
        onClose={(visible, task) => {
          //task is null if process was cancelled
          if (task != null) { addNewTask(task, selectedDayList) }
          onClose(visible)
        }
        }
        task={myTask}
      />

    )
  }
}



