import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './screen/Login';
import Signup from './screen/Signup';
import MainScreen from './screen/MainScreen';
import SessionScreen from './screen/SessionScreen';
import HeaderContainer from './components/HeaderComponent/Header';
import SendEmailScreen from './screen/SendEmailScreen';
import CreateSessionScreen from './screen/CreateSessionScreen';
import BottomNavigator from './components/Navigator/BottomNavigator';

const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        <Stack.Screen name='Session' component={SessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
