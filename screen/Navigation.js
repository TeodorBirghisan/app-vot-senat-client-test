import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screen/Login';
import Signup from '../screen/Signup';
import MainScreen from '../screen/MainScreen';
import SessionScreen from '../screen/SessionScreen';
import HeaderContainer from '../components/HeaderComponent/Header';

const Stack = createStackNavigator();

const NavigationLogic = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            //header: HeaderContainer
          }
        }
      >
        <Stack.Screen
          name='LoginScreen'
          component={Login}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name='MainScreen'
          component={MainScreen}
          options={{ header: HeaderContainer }}
        />
        <Stack.Screen name='SessionScreen' component={SessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLogic;
