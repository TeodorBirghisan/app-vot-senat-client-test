import 'react-native-gesture-handler';
import React, { useState, useEffect, useFocusEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from './screen/Login';
import Signup from './screen/SignUp/Signup';
import MainScreen from './screen/MainScreen';
import SessionScreen from './screen/SessionScreen';
import HeaderContainer from './components/HeaderComponent/Header';
import SendEmailScreen from './screen/SendEmailScreen';
import CreateSessionScreen from './screen/CreateSessionScreen';
import BottomNavigator from './components/Navigator/BottomNavigator';
import SessionDrawer from './components/Drawer/SessionDrawer';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

const getUserToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    //console.log('User Token', token);
  } catch (error) {
    console.log(error);
  }
};

export default function App() {
  //getUserToken();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='SignUp'
          component={Signup}
          initialParams={{ role: 'admin' }}
        />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        <Stack.Screen name='Session' component={SessionDrawer} />
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
