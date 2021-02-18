import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { getAllMembersFromMeeting } from '../../endpoints/Endpoints';

const UserList = (props) => {
  const sessionID = useRoute('Users').params.sessionID;
  const [users, setUsers] = useState();
  useEffect(() => {
    const ac = new AbortController();
    getAllMembersFromMeeting(sessionID).then((response) => {
      setUsers(response);
    });
    return () => ac.abort();
  }, []);

  const keyExtractor = (item, index) => item.id.toString();
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Icon name='user' type='font-awesome' />
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
        <ListItem.Subtitle>{item.role}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={users}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({});

export default UserList;
