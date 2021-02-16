import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { joinMeetingAsUSer, deleteAMeeting } from '../../endpoints/Endpoints';
import jwt_decode from 'jwt-decode';
import { getInSecureStore } from '../../constants/Functions';
import { Alert } from 'react-native';

const SessionCard = (props) => {
  const navigation = useNavigation();
  const onJoinPressed = async () => {
    const token = await getInSecureStore(props.username);
    const decodedToken = await jwt_decode(token);
    //console.log(decodedToken);
    //console.log(`UTILIZATORUL  ${props.username}`);
    joinMeetingAsUSer(props.sessionID, decodedToken.user_id, token).then(
      (response) => {
        console.log(response);
        if (response.success === true) {
          Alert.alert(
            'Welcome to this Session',
            `${response.message}     Vote Carefully`,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Session', {
                    itemID: props.sessionID,
                    username: props.username
                  });
                }
              }
            ]
          );
        } else if (response.success === false) {
          Alert.alert(
            'Oooops!',
            response.message,
            [
              {
                text: 'Cancel',
                onPress: () => {
                  console.log('Cancel Pressed');
                },
                style: 'cancel'
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
        }
      }
    );
  };
  const onDeletePressed = () => {
    Alert.alert(
      `Delete Meeting ${props.title}`,
      'Are you sure you want to delete this meeting?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            deleteAMeeting(props.sessionID).then((response) => {
              console.log(response);
            });
          }
        }
      ],
      { cancelable: false }
    );
  };
  return (
    <Card style={styles.cardContainer}>
      <Icon
        raised
        name='trash'
        type='font-awesome'
        color='#f50'
        onPress={() => onDeletePressed()}
      />
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
