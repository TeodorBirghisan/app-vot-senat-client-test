import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import SendEmailScreen from '../../screen/SendEmailScreen';
import CreateSessionScreen from '../../screen/CreateSessionScreen';
import MainScreen from '../../screen/MainScreen';

const BottomTabs = createMaterialBottomTabNavigator();

const BottomNavigator = (props) => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name='MainScreen' component={MainScreen} />
      <BottomTabs.Screen
        name='CreateSessionScreen'
        component={CreateSessionScreen}
      />
      <BottomTabs.Screen name='SendEmailScreen' component={SendEmailScreen} />
    </BottomTabs.Navigator>
  );
};

export default BottomNavigator;
