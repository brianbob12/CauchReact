import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from "react-native-paper"

//import screens

import HomeScreen from './src/Components/Screens/HomeScreen.js'
import PomodoroScreen from "./src/Components/Screens/PomodoroScreen.js"
import ClassroomScreen from "./src/Components/Screens/ClassroomScreen.js"
import RepeatingScreen from "./src/Components/Screens/RepeatingScreen.js"

function AnalyticsScreenDisabled() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Analytics coming soon</Text>
    </View>
  );
}
function ClassroomScreenDisabled() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Google Classroom integration coming soon</Text>
    </View>
  );
}
function RepeatingScreenDisabled() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Repeating Tasks Coming Soon</Text>
    </View>
  );
}
function PomodoroScreenDisabled() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pomodoro Timer Coming Soon</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'checkbox'
                        : 'checkbox-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Classroom') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'log-in'
                        : 'log-in-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Pomodoro") {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'timer'
                        : 'timer-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Repeating Tasks') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'repeat'
                        : 'repeat-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Analytics') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'analytics'
                        : 'analytics-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "#00a9d4",
            inactiveTintColor: "gray",

          }}
          initialRouteName={"Home"}
        >
          <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
          <Tab.Screen name="Classroom" component={ClassroomScreenDisabled} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Repeating Tasks" component={RepeatingScreenDisabled} />
          <Tab.Screen name="Analytics" component={AnalyticsScreenDisabled} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}



const styles = StyleSheet.create({

});
