import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { joinMeetingAsUSer, deleteAMeeting } from '../../endpoints/Endpoints';
import jwt_decode from 'jwt-decode';
import { getInSecureStore } from '../../constants/Functions';
import { Alert } from 'react-native';

const SessionCardHistory = (props) => {
  const navigation = useNavigation();
  const onDetailsPress = () => {
    navigation.navigate('SessionHistoryDrawer', {
      itemID: props.sessionID,
      username: props.username
    });
  };

  return (
    <Card style={styles.cardContainer}>
      <Card.Title>{props.title}</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>{props.programmed_for}</Text>
      <TouchableOpacity
        onPress={() => {
          onDetailsPress();
        }}
        style={styles.buttonStyle}
      >
        <Text style={styles.text}>Details</Text>
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
  }
});

export default SessionCardHistory;
