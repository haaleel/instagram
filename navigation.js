// import { View, Text } from 'react-native'
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import 'react-native-gesture-handler';

import HomeScreen from "./screen/HomeScreen";
import PostScreen from "./screen/PostScreen";
import LoginScreen from "./screen/LoginScreen";
import SginUpScreen from "./screen/SginUpScreen";
// import ProfileScreen from "./screen/ProfileScreen";
const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};
export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
    {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen}/> */}
    </Stack.Navigator>
  </NavigationContainer>
);
export const SignOutStack=()=>(


  <NavigationContainer>
  <Stack.Navigator
    initialRouteName="LoginScreen"
    screenOptions={screenOptions}
  >
   
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SginUpScreen" component={SginUpScreen} />
  </Stack.Navigator>
</NavigationContainer>




)
