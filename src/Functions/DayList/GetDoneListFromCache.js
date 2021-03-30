//a function to get a done dayList from cache by the date 

import AsyncStorage from '@react-native-async-storage/async-storage'

//inputs id as string
//outputs JSON object task


export default (date) => {
  // takes the date of the monday of the given week 
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("DAYLIST-DONE" + date.toString(36)).then((result) => {
      //TODO deal with error
      var out = JSON.parse(result)
      resolve(out)
    })
  })
}