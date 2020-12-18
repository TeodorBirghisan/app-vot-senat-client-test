import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Login from './screen/Login';
import Signup from './screen/Signup';
import MainScreen from './screen/MainScreen';
import SessionScreen from './screen/SessionScreen';
import MyStack from './Test';

export default function App() {
  return <SessionScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
