//a class to hold the contents of a day

export default class DayList {
  //must have:
  //realTaskIDs - a list of IDs of real Tasks
  //allTaskList - a list of objects(which have title and description) this includes real tasks and virtual tasks
  //NOTE: in future allTaskList should be sorted by start time 
  //blacklistedRepeatingTasks - a list of IDs of repeating tasks that are blacklised and thus should not be added as virtual tasks.
  //day - A date object with the date of the day

  //persistent components:
  //day
  //realTaskIDs
  //blacklistedRepeatingTasks

  constructor(day) {
    this.day = day
    this.realTaskIDs = []
    this.allTaskList = []
    this.blacklistedRepeatingTasks = []
  }

  addRealTask(realTaskID, realTaskIDMap) {
    this.realTaskIDs.push(realTaskID)
    this.allTaskList.push(realTaskIDMap[realTaskID])//TODO re order allTaskList
  }

}