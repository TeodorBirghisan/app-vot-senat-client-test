import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { joinMeetingAsUSer } from '../../endpoints/Endpoints';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import { getInSecureStore } from '../../constants/Functions';

const SessionCard = (props) => {
  const navigation = useNavigation();
  const onJoinPressed = async () => {
    const token = getInSecureStore(props.username);
    const decodedToken = await jwt_decode((await token).toString());
    console.log(decodedToken);
    console.log(`UTILIZATORUL  ${props.username}`);
    joinMeetingAsUSer(props.sessionID, decodedToken.user_id).then(
      (response) => {
        console.log(response);
      }
    );
  };
  return (
    <Card style={styles.cardContainer}>
      <Card.Title>{props.title}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>
        Display the live Session if there is any Or display not current Live
        Session
        {props.programmed_for}
      </Text>
      <Button
        style={styles.buttonStyle}
        title='JOIN'
        onPress={() => {
          navigation.navigate('Session', { itemID: props.sessionID });
          onJoinPressed();
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
});

export default SessionCard;
