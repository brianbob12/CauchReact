//a function to get a real task from cache by ID

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs id as string
//outputs JSON object task


export default (id) => {
  //id as string
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("TASK" + id).then((result) => {
      //TODO deal with error
      const out = JSON.parse(result)
      if (out == null) {
        //this is a contignecy
        resolve({
          name: "NULL TASK",
          description: "This task had no stored value in cahce",
          id: id,
          icon: "ban-outline",
          iconColor: "#FF0000"
        })
      }
      else {
        resolve(out)
      }
    })
  })
}