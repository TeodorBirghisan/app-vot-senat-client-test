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

import Login from './screen/Login';
import Signup from './screen/Signup';
import MainScreen from './screen/MainScreen';
import SessionScreen from './screen/SessionScreen';
import HeaderContainer from './components/HeaderComponent/Header';
import { Button } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  /*const [text, setText] = useState([]);
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await fetch('http://192.168.0.111:8080/topic/all');
        const data = await response.json();
        setText(data);
      } catch (error) {
        console.log(error);
      }
    };

    getResponse();
  }, []);*/
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='Session' component={SessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    /*<View style={styles.container}>
      <Text>text</Text>
      <Button title={'geee'} onPress={() => console.log(text)} />
    </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
