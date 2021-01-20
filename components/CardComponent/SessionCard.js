import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { getAllTopicsInMeeting } from '../../endpoints/Endpoints';

const SessionCard = (props, { route }) => {
  const navigation = useNavigation();
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
