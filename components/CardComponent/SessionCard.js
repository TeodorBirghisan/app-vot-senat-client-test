import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
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
    <Card wrapperStyle={styles.cardContainer}>
      <Icon
        raised
        name='trash'
        type='font-awesome'
        color='#DA723C'
        onPress={() => onDeletePressed()}
      />
      <Card.Title style={styles.title}>{props.title}</Card.Title>
      <View style={styles.content}>
        <Text style={styles.text}>{props.programmed_for}</Text>
        <Card.Divider style={{ top: 10, backgroundColor: '#fb743e' }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          onJoinPressed();
        }}
        style={styles.buttonStyle}
      >
        <Text style={styles.text}>Join</Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'red',
    elevation: 8,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: '#8ac4d0',
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    bottom: 25
  },
  cardContainer: {
    height: 200
  },
  text: { fontSize: 17 },
  title: { bottom: '25%', fontSize: 20 }
});

export default SessionCard;
