import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
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
      <Button
        style={styles.buttonStyle}
        title='Detalii'
        onPress={() => {
          onDetailsPress();
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

export default SessionCardHistory;
