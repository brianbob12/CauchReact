//a function that gets classwork to do from a class
//requires Oauth token

import getDayToday from "../Functions/DayList/GetDayToday.js"

export default (accessToken, courseId) => {
  return (new Promise((resolve, reject) => {
    fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    ).then((res) => res.json())
      .then((res) => {
        const courseWork = res.courseWork
        var validTasks = []
        //tasks are only valid if they due in the future.
        for (var i = 0; i < courseWork.length; i++) {
          const element = courseWork[i]
          //check if assignment
          if (element.workType === "ASSIGNMENT") {
            //check if there is a due date
            if (element.dueDate != undefined) {
              const dueDate = new Date(element.dueDate.year, element.dueDate.month,
                element.dueDate.day, 0, 0, 0, 0)
              //check if that due date has passed
              if (dueDate.getTime() > getDayToday()) {
                //it's valid!
                validTasks.push(element)
              }
            }
          }
        }
        resolve(validTasks)
      })
  }))
}