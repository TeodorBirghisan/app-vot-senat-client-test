import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screen/Login';
import Signup from './screen/Signup';
import MainScreen from './screen/MainScreen';
import SessionScreen from './screen/SessionScreen';
import HeaderContainer from './components/HeaderComponent/Header';
import CreateSessionScreen from './screen/CreateSessionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CreateSession'>
        <Stack.Screen name='CreateSession' component={CreateSessionScreen} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='Session' component={SessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {}
});
