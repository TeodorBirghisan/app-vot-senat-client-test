import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NavigationContainer,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import UserList from '../List/UserList';
import SessionScreen from '../../screen/SessionScreen';

const Drawer = createDrawerNavigator();

//TODO: Aici sa fac allUsers in Meeting
//TODO: Aici sa fac aflu toate Topicurile
const SessionDrawer = (props) => {
  const sessionID = useRoute('Session').params.itemID;
  return (
    <Drawer.Navigator initialRouteName='SessionScreen'>
      <Drawer.Screen name='Users' component={UserList} />
      <Drawer.Screen
        name='SessionScreen'
        component={SessionScreen}
        initialParams={{ sessionID }}
      />
    </Drawer.Navigator>
  );
};

export default SessionDrawer;
