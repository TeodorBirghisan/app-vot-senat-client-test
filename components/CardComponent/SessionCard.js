import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements';

const SessionCard = (props) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Title>LIVE SESSION</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>
        Display the live Session if there is any Or display not current Live
        Session
      </Text>
      <Button style={styles.buttonStyle} title='VOTE NOW' />
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
