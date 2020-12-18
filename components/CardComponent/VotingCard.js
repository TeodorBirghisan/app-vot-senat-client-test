import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card, ListItem, ButtonGroup, Icon } from 'react-native-elements';

const SessionCard = (props) => {
  const buttons = ['DA', 'NU', 'MA ABTIN'];
  return (
    <Card>
      <Card.Title>CARD WITH DIVIDER</Card.Title>
      <Card.Divider />
      <Text>Majorare Salriu Ce parere avet?</Text>
      <View style={styles.buttonContainer}>
        <ButtonGroup buttons={buttons} style={styles.button} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {},
  buttonContainer: {}
});

export default SessionCard;
