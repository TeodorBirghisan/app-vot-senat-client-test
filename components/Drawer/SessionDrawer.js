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
  const username = useRoute('Session').params.username;
  return (
    <Drawer.Navigator initialRouteName='SessionScreen'>
      <Drawer.Screen
        name='Users'
        component={UserList}
        initialParams={{ sessionID }}
      />
      <Drawer.Screen
        name='SessionScreen'
        component={SessionScreen}
        initialParams={{ sessionID, username }}
      />
    </Drawer.Navigator>
  );
};

export default SessionDrawer;
