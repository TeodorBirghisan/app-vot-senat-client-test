import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
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
import RedirectWelcomeScreen from './screen/RedirectWelcomeScreen';
import HistoryScreen from './screen/HistoryScreen';
import SessionHistoryScreen from './screen/SessionHistoryScreen';
import SessionHistoryDrawer from './components/Drawer/SessionHistoryDrawer';
import DetailedHistory from './screen/DetailedHistory';
import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();

const getUserToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    //console.log('User Token', token);
  } catch (error) {
    console.log(error);
  }
};
/*
const SignUpLinking = () => {};

function urlRedirect(url) {
  //const navigation = useNavigation();
  if (!url) return;
  // parse and redirect to new url
  let { path } = Linking.parse(url);
  console.log(
    `Linked to app with path: ${path} and data:` // ${JSON.stringify(queryParams)}`
  );
  return url;
}*/

/*Linking.addEventListener('url', (event) => {
    urlRedirect(event.url);
  });*/

export default function App() {
  const [fromExternalPath, setFromExternalPath] = useState(false);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const ac = new AbortController();
    Linking.getInitialURL().then((url) => {
      console.log(Linking.parse(url));
      const { path, queryParams } = Linking.parse(url);
      console.log(queryParams.role);
      //console.log(path);
      if (path === null) {
        setFromExternalPath(false);
      } else {
        setFromExternalPath(true);
        setUserRole(queryParams.role);
      }
    });
    return () => ac.abort();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='RedirectWelcome'>
        <Stack.Screen
          name='RedirectWelcome'
          component={(navProps) => (
            <RedirectWelcomeScreen
              fromExternalPath={fromExternalPath}
              userRole={userRole}
              {...navProps}
            />
          )}
        />
        <Stack.Screen name='Email' component={SendEmailScreen} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        <Stack.Screen name='Session' component={SessionDrawer} />
        <Stack.Screen name='SignUp' component={Signup} />
        <Stack.Screen
          name='SessionHistoryDrawer'
          component={SessionHistoryDrawer}
        />
        <Stack.Screen name='DetailedHistory' component={DetailedHistory} />
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

/*

export default function App() {
  const [path, setPath] = useState('');
  const [fromExternalPath, setFromExternalPath] = useState(false);
  const [userKey, setUserKey] = useState(false);
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      const { path, userKeyCode } = Linking.parse(url);
      
      
      //console.log(path);
      if (path === null) {
        setFromExternalPath(false);
        
      } else {
        setFromExternalPath(true);
        setUserKey(userKeyCode);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='RedirectWelcome'>
        <Stack.Screen name='SendEmailScreen' component={SendEmailScreen} />
        <Stack.Screen
          name='RedirectWelcome'
          component={(navProps)=><RedirectWelcomeScreen fromExternalPath={fromExternalPath} userKey={userKey} {...navProps} />}
        />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        <Stack.Screen name='Session' component={SessionDrawer} />
        <Stack.Screen name='SignUp' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function RedirectWelcomeScren(props) {
 	
  useEffect(()=>{
    
    //fetch de verificare la server sa vezi daca e ok userul sau rolul
    
    //navighezi unde vrei
    
    if(props.fromExternalPath)
      	navigator.navigate('SignUp')
    navigator.navigate('Login')
  },[props])
  
  return (
    <Spinner/>
  )
  
}

*/
