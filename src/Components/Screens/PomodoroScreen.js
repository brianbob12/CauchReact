import * as React from 'react';
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons"
import ProgressCircle from "../ProgressCircle/circle.js"
import {
  Dimensions,
  Button,
  Text,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

//SetUp variables
const { width, height } = Dimensions.get('window');
//lets add caching to this
//so it works when you close the app
export default () => {
  //check that the work timer can go to the rest timer and vice versa then see if the timer stops at a counter of 8

  var [totalTime, setTotalTime] = useState(1800);
  var [pauseTime, setPauseTime] = useState(0);
  var [paused, setPaused] = useState(0);
  var [stopped, setStopped] = useState(0);
  var [ref, setRef] = useState(null);
  const [counter, setCounter] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [startTime, setStartTime] = useState(new Date().getTime());

  //this starts playing the timer after it has been paused - runs when the play button is pressed and the timer is paused
  function play() {
    if (paused == true && stopped == false) {
      setStartTime(startTime + (new Date().getTime() - pauseTime));
      var time = new Date().getTime() - startTime;
      setPaused(false);
      setTimeout(() => {
        if (time > 0 && paused == false && stopped == false) {
          setRerender(rerender + 1);
        }
      }, 100);
    }
  }
  // stops the timer by both pausing and resetting the time
  function stop() {
    setStopped(true);
    setPaused(true);
    setStartTime(new Date().getTime());
    setCounter(0)
  }
  //pauses the timer
  function pause() {
    if (paused == false && stopped == false) {
      setPaused(true);
      setPauseTime(new Date().getTime());
    }
  }
  //this is able to restart the timer after its been stopped
  function reset() {
    if (stopped) {
      setStopped(false);
      setPaused(false);
      setStartTime(new Date().getTime());
    }
  }

  //this is the main loop that runs when the timer is unpaused, isn't 0 and isn't stopped - runs every 0.1 seconds
  var time = Math.floor((new Date().getTime() - startTime) / 1000);
  var dispTime = new Date().getTime() - startTime;
  if (paused == false && stopped == false) {
    if (time < totalTime) {
      setTimeout(() => {
        setRerender(rerender + 1);
      }, 100);
    }

    if (time == totalTime) {
      if (counter % 2 == 0 && counter < 7 && counter > -1) {
        setStartTime(new Date().getTime());
        time = Math.floor((new Date().getTime() - startTime) / 1000);
        setCounter(counter + 1);
        setTotalTime(300);
        play;
      } else if (counter % 2 != 0 && counter < 7 && counter > -1) {
        setCounter(counter + 1);
        setStartTime(new Date().getTime());
        time = Math.floor((new Date().getTime() - startTime) / 1000);
        setTotalTime(1800);
        setRerender(rerender + 1);
        play;
      } else if (counter == -1) {
        setStartTime(new Date().getTime());
        time = Math.floor((new Date().getTime() - startTime) / 1000);
        setTotalTime(1800);
        setCounter(counter + 1);
        setRerender(rerender + 1);
        play;
      } else if (counter == 7) {
        stop();
        //timeText == String('Well done, you have completed the timer')
      }
    }
  }

  var timeText =
    String(Math.floor(totalTime / 60 - Math.ceil(time / 60))) +
    ':' +
    String(Math.floor(60 - (time - parseInt(time / 60) * 60)))

  if (60 - (time - parseInt(time / 60) * 60) < 10) {
    timeText =
      String(Math.floor(totalTime / 60 - Math.ceil(time / 60))) +
      ':0' +
      String(Math.floor(60 - (time - parseInt(time / 60) * 60)));
  } else if (Math.floor(60 - (time - parseInt(time / 60) * 60)) == 60) {
    timeText =
      String(Math.floor(totalTime / 60 - Math.ceil(time / 60))) + ":00"
  }

  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "stretch" }}>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <View style={{ flex: 2, justifyContent: "space-evenly", alignItems: "center" }}>
          <ProgressCircle
            value={dispTime / (totalTime * 1000)}
            size={300}
            thickness={16}
            color="#00a9d4"
            unfilledColor="#f2f2f2"
            animationMethod="spring"
            animationConfig={{ speed: 4 }}>
            <Text style={{ color: "#00a9d4", fontSize: 80, fontWeight: 'bold' }}>
              {timeText}
            </Text>
          </ProgressCircle>
        </View>
        <View style={{ flex: 1, alignContent: "stretch" }}>
          <View style={{ flex: 1, alignContent: "center", justifyContent: "space-evenly", flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={stop}>
              <Ionicons name={"stop-sharp"} size={50} color={stopped ? "#C5C5C5" : "grey"} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={paused ? play : pause}>
              <Ionicons name={paused ? "play-sharp" : "pause-sharp"} size={50} color={stopped ? "#C5C5C5" : "grey"} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={reset}>
              <Ionicons name={"refresh-sharp"} size={50} color={stopped ? "grey" : "#C5C5C5"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View >
  )
}
