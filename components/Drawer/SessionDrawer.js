import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import UserList from '../List/UserList';
import SessionScreen from '../../screen/SessionScreen';
/*
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title='Go to notifications'
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title='Go back home' />
    </View>
  );
}
*/
const Drawer = createDrawerNavigator();

const SessionDrawer = (props) => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator initialRouteName='SessionScreen'>
      <Drawer.Screen name='Users' component={UserList} />
      <Drawer.Screen name='SessionScreen' component={SessionScreen} />
    </Drawer.Navigator>
  );
};

export default SessionDrawer;
