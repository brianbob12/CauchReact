import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function TagsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tags</Text>
    </View>
  );
}

function ClassroomScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Classroom</Text>
    </View>
  );
}

function AnalyticsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Analyctics</Text>
    </View>
  );
}

function RepeatingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Repeating</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
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
            } else if (route.name === 'Tags') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'pricetags'
                      : 'pricetags-outline'
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
          activeTintColor: '#00a9d4FF',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Tags" component={TagsScreen} />
        <Tab.Screen name="Classroom" component={ClassroomScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Repeating Tasks" component={RepeatingScreen} /> 
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Oxygen'
  },
});
