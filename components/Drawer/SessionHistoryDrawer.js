import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import UserList from '../List/UserList';
import SessionHistoryScreen from '../../screen/SessionHistoryScreen';

const Drawer = createDrawerNavigator();

const SessionHistoryDrawer = (props) => {
  const sessionID = useRoute('Session').params.itemID;
  const username = useRoute('Session').params.username;
  return (
    <Drawer.Navigator initialRouteName='SessionHistoryDrawer'>
      <Drawer.Screen
        name='SessionHistory'
        component={SessionHistoryScreen}
        initialParams={{ sessionID, username }}
      />
      <Drawer.Screen
        name='Users'
        component={UserList}
        initialParams={{ sessionID }}
      />
    </Drawer.Navigator>
  );
};

export default SessionHistoryDrawer;
