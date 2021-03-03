import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { getInSecureStore } from '../../constants/Functions';
import jwt_decode from 'jwt-decode';
import { Icon } from 'react-native-elements';
import SendEmailScreen from '../../screen/SendEmailScreen';
import CreateSessionScreen from '../../screen/CreateSessionScreen';
import MainScreen from '../../screen/MainScreen';
import History from '../../screen/HistoryScreen';

const BottomTabs = createMaterialBottomTabNavigator();

const testRole = async (username) => {
  const token = getInSecureStore(username);
  const decodedToken = await jwt_decode((await token).toString());
  const role = decodedToken.role;
  return role;
};

const AdminScreens = (props) => {
  return (
    <BottomTabs.Navigator barStyle={{ backgroundColor: '#8ac4d0' }}>
      <BottomTabs.Screen
        name='MainScreen'
        component={MainScreen}
        initialParams={{ username: props.username }}
        options={{
          tabBarIcon: () => (
            <Icon name='home' type='font-awesome' color='#28527a' />
          ),
          tabBarLabel: 'Home'
        }}
      />
      <BottomTabs.Screen
        name='CreateSessionScreen'
        component={CreateSessionScreen}
        initialParams={{ username: props.username }}
        options={{
          tabBarIcon: () => (
            <Icon name='plus' type='font-awesome' color='#28527a' />
          ),
          tabBarLabel: 'Create Session'
        }}
      />
      <BottomTabs.Screen
        name='History'
        component={History}
        initialParams={{ username: props.username }}
        options={{
          tabBarIcon: () => (
            <Icon name='history' type='font-awesome' color='#28527a' />
          ),
          tabBarLabel: 'History'
        }}
      />
      <BottomTabs.Screen
        name='SendEmailScreen'
        component={SendEmailScreen}
        options={{
          tabBarIcon: () => (
            <Icon name='envelope' type='font-awesome' color='#28527a' />
          ),
          tabBarLabel: 'Send Email'
        }}
      />
    </BottomTabs.Navigator>
  );
};

const SenatorScreens = (props) => {
  return (
    <BottomTabs.Navigator style={{ backgroundColor: '#8ac4d0' }}>
      <BottomTabs.Screen
        name='MainScreen'
        component={MainScreen}
        initialParams={{ username: props.username }}
        options={{
          tabBarIcon: () => (
            <Icon name='home' type='font-awesome' color='#28527a' />
          ),
          tabBarLabel: 'Home'
        }}
      />
      <BottomTabs.Screen
        name='History'
        component={History}
        initialParams={{ username: props.username }}
        options={{
          tabBarIcon: () => (
            <Icon name='history' type='font-awesome' color='#28527a' />
          ),
          tabBarLabel: 'History'
        }}
      />
    </BottomTabs.Navigator>
  );
};

///DA render de prea multe ori

const BottomNavigator = (props) => {
  const username = useRoute('BottomNavigator').params.username;
  const [canAccess, setCanAccess] = useState(false);
  testRole(username).then((result) => {
    if (result === 'admin') setCanAccess(true);
    else setCanAccess(false);
  });
  if (canAccess === true) {
    return <AdminScreens username={username} />;
  } else {
    return <SenatorScreens username={username} />;
  }
};
/*
<BottomTabs.Navigator>
      {canAccess === true ? (
        //user is admin
        ((
          <BottomTabs.Screen
            name='MainScreen'
            component={MainScreen}
            initialParams={{ username: username }}
          />
        ),
        (
          <BottomTabs.Screen
            name='CreateSessionScreen'
            component={CreateSessionScreen}
          />
        ))
      ) : (
        <BottomTabs.Screen
          name='MainScreen'
          component={MainScreen}
          initialParams={{ username: username }}
        />
      )}
    </BottomTabs.Navigator>
*/

export default BottomNavigator;
