import * as React from 'react';
import RepeatingTask from '../Tasks/RepeatingTask';

//task context is a function that allows all child components to have access to the following:
//RealTaskIDMap -- a map of IDs to Real tasks
//RepeatingTaskIDMap -- a map of IDs to Repeating tasks
//RealTaskCounter -- the next real task ID
//RepeatingTaskCounter -- the next repeating task ID
//IncrementRealTaskCounter -- a function that iterates the RealTaskCounter
//IncrementRepeatingTaskCounter -- a function that iterates the RepeatingTaskCounter

const TaskContext = React.createContext()

const TaskProvider = props => {

  const taskData = {
    testString: "TestString",
    RealTaskIDMap: new Object,
    RepeatingTaskIDMap: new Object,
    RealTaskCounter: 0,//TODO import this
    RepeatingTaskCounter: 0,//TODO import this
    IncrementRealTaskCounter: () => { RealTaskCounter += 1 },
    IncrementRepeatingTaskCounter: () => { RepeatingTaskCounter += 1 }
  }
  return (
    <TaskContext.Provider value={taskData}>
      {props.children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider }